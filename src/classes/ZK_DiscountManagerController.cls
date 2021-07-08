public with sharing class ZK_DiscountManagerController {

    public class ActivationResult {
        @AuraEnabled public Boolean success;
        @AuraEnabled public Map<String, String> collidingProducts;
    }

    public class DiscountsData {
        @AuraEnabled public Pricebook2 discounts;
        @AuraEnabled public List<Id> selected;
    }

    @AuraEnabled
    public static List<ZK_ProductsController.ProductData> listProducts() {
        return ZK_ProductsController.listProducts();
    }

    @AuraEnabled
    public static List<Pricebook2> getDiscounts() {
        List<Pricebook2> priceBooks = [SELECT Id,Name,Discount_Percent__c,All_Products__c,IsActive FROM Pricebook2 WHERE IsStandard = false];
        return priceBooks;
    }

    @AuraEnabled
    public static ActivationResult switchDiscount(Id discountId) {
        return handleActivationSwitch(discountId);
    }

    @AuraEnabled
    public static DiscountsData getDiscount(Id id) {
        List<Pricebook2> discounts = [SELECT Id,Name,Discount_Percent__c,All_Products__c FROM Pricebook2 WHERE Id = :id];
        if (discounts.isEmpty()) {
            return null;
        }

        DiscountsData discountsData = new DiscountsData();
        discountsData.discounts = discounts[0];

        if (discounts[0].All_Products__c) {
            discountsData.selected = new List<Id>();
            return discountsData;
        }

        List<PricebookEntry> entries = [SELECT Product2Id FROM PricebookEntry WHERE Pricebook2.Id = :id];
        discountsData.selected = new List<Id>();
        for (PricebookEntry ent : entries) {
            discountsData.selected.add(ent.Product2Id);
        }

        return discountsData;
    }

    @AuraEnabled
    public static Boolean createDiscount(String discountName, Decimal discountValue, List<Id> products) {
        Pricebook2 pricebook2 = new Pricebook2();
        pricebook2.Name = discountName;
        pricebook2.Discount_Percent__c = discountValue;
        pricebook2.IsActive = false;

        if (products.isEmpty()) {
            pricebook2.All_Products__c = true;
            insert pricebook2;
            return true;
        }

        insert pricebook2;

        ZK_Main_Price_Book__c mainPriceBook = ZK_Main_Price_Book__c.getOrgDefaults();
        String mainPriceBookName = mainPriceBook.Name__c;

        insertEntries(pricebook2, mainPriceBookName, discountValue, products);

        return true;
    }

    @AuraEnabled
    public static Boolean updateDiscount(Id discountId, String discountName, Decimal discountValue, List<Id> products) {
        List<Pricebook2> discounts = [SELECT Id,Name,Discount_Percent__c,All_Products__c FROM Pricebook2 WHERE Id = :discountId];
        if (discounts.isEmpty()) {
            return false;
        }

        Pricebook2 d = discounts[0];
        updatePriceBook(d, discountName, discountValue, products);

        List<PricebookEntry> entriesToDelete = [SELECT Id FROM PricebookEntry WHERE Pricebook2Id = :discountId];
        delete entriesToDelete;

        if (d.All_Products__c) {
            return true;
        }

        ZK_Main_Price_Book__c mainPriceBook = ZK_Main_Price_Book__c.getOrgDefaults();
        String mainPriceBookName = mainPriceBook.Name__c;

        updateEntries(discountId, mainPriceBookName, discountValue, products);

        return true;
    }

    @AuraEnabled
    public static Boolean deleteDiscount(Id id) {
        List<PricebookEntry> entries = [SELECT Id FROM PricebookEntry WHERE Pricebook2Id = :id];
        delete entries;

        Database.DeleteResult res = Database.delete(id);
        return res.success;
    }

    private static ActivationResult handleActivationSwitch(Id discountId) {
        ActivationResult result = new ActivationResult();

        List<Pricebook2> priceBooks = [SELECT Id,IsActive,All_Products__c FROM Pricebook2 WHERE Id = :discountId];
        if (priceBooks.isEmpty()) {
            result.success = false;
            return result;
        }

        Pricebook2 pricebook = priceBooks[0];
        if (!pricebook.IsActive) {

            List<Pricebook2> allProducts = [SELECT Id,IsActive,Name FROM Pricebook2 WHERE IsActive = true AND All_Products__c = true];
            if (!allProducts.isEmpty()) {
                Pricebook2 allPricebook2 = allProducts[0];
                result.success = false;
                result.collidingProducts = new Map<String, String>();

                result.collidingProducts.put(Label.ZK_Message_Collision_Discount_All, allPricebook2.Name);
                return result;
            }

            List<PricebookEntry> thisDiscountEntries = [
                    SELECT Product2Id, Product2.Name
                    FROM PricebookEntry
                    WHERE Pricebook2.Id = :discountId
            ];

            List<PricebookEntry> activeEntries = [
                    SELECT Product2.Name,Product2Id,Pricebook2.Name
                    FROM PricebookEntry
                    WHERE Pricebook2.IsActive = true AND Pricebook2.IsStandard = false
            ];

            result.collidingProducts = new Map<String, String>();
            if (pricebook.All_Products__c) {
                for (PricebookEntry activeEntry : activeEntries) {
                    result.collidingProducts.put(activeEntry.Product2.Name, activeEntry.Pricebook2.Name);
                }
            } else {
                for (PricebookEntry entry : thisDiscountEntries) {
                    for (PricebookEntry activeEntry : activeEntries) {
                        if (entry.Product2Id == activeEntry.Product2Id) {
                            result.collidingProducts.put(entry.Product2.Name, activeEntry.Pricebook2.Name);
                        }
                    }
                }
            }

            result.success = result.collidingProducts.isEmpty();
            if (!result.success) {
                return result;
            }

        }

        pricebook.IsActive = !pricebook.IsActive;
        update pricebook;

        result.success = true;

        return result;
    }

    private static void updatePriceBook(Pricebook2 pricebook2, String discountName,
            Decimal discountValue, List<Id> products) {

        pricebook2.Name = discountName;
        pricebook2.Discount_Percent__c = discountValue;
        pricebook2.All_Products__c = products.isEmpty();
        pricebook2.IsActive = false;
        update pricebook2;
    }

    private static void updateEntries(Id discountId, String mainPriceBookName, Decimal discountValue, List<Id> products) {
        List<PricebookEntry> pricebookEntries = [SELECT Product2Id,UnitPrice FROM PricebookEntry WHERE Pricebook2.Name = :mainPriceBookName];
        List<PricebookEntry> entries = new List<PricebookEntry>();
        for (PricebookEntry pricebookEntry : pricebookEntries) {
            if (products.contains(pricebookEntry.Product2Id)) {
                PricebookEntry entry = new PricebookEntry();
                entry.Pricebook2Id = discountId;
                entry.Product2Id = pricebookEntry.Product2Id;
                entry.UnitPrice = pricebookEntry.UnitPrice - pricebookEntry.UnitPrice * (discountValue / 100);
                entries.add(entry);
            }
        }
        insert entries;
    }

    private static void insertEntries(Pricebook2 pricebook2, String mainPriceBookName, Decimal discountValue, List<Id> products) {
        List<PricebookEntry> pricebookEntries = [SELECT Product2Id,UnitPrice FROM PricebookEntry WHERE Pricebook2.Name = :mainPriceBookName];
        List<PricebookEntry> entries = new List<PricebookEntry>();
        for (PricebookEntry pricebookEntry : pricebookEntries) {
            if (products.contains(pricebookEntry.Product2Id)) {
                PricebookEntry entry = new PricebookEntry();
                entry.Pricebook2Id = pricebook2.Id;
                entry.Product2Id = pricebookEntry.Product2Id;
                entry.UnitPrice = pricebookEntry.UnitPrice - pricebookEntry.UnitPrice * (discountValue / 100);
                entries.add(entry);
            }
        }

        insert entries;
    }

}