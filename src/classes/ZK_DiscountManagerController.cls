public with sharing class ZK_DiscountManagerController {

    public class DiscountsData {
        @AuraEnabled public Discounts__c discounts;
        @AuraEnabled public List<Id> selected;
    }

    @AuraEnabled
    public static List<ZK_ProductsController.ProductData> listProducts() {
        return ZK_ProductsController.listProducts();
    }

    @AuraEnabled
    public static List<Discounts__c> getDiscounts() {
        return [SELECT Id,Name,Discount_Percent__c,Active__c,Type__c FROM Discounts__c];
    }

    @AuraEnabled
    public static DiscountsData getDiscount(Id id) {
        List<Discounts__c> discounts = [SELECT Id,Name,Discount_Percent__c,Active__c,Type__c FROM Discounts__c WHERE Id=:id];
        if (discounts.isEmpty()){
            return null;
        }

        DiscountsData discountsData = new DiscountsData();
        discountsData.discounts = discounts[0];

        List<Discount_Entry__c> entries = [SELECT Product__c FROM Discount_Entry__c WHERE Discounts__c=:id];
        discountsData.selected = new List<Id>();
        for (Discount_Entry__c ent : entries) {
            discountsData.selected.add(ent.Product__c);
        }

        return discountsData;
    }


    @AuraEnabled
    public static Boolean createDiscount(String discountName, Decimal discountValue, List<Id> products) {
        Discounts__c discounts = new Discounts__c();
        discounts.Name = discountName;
        discounts.Type__c = 'Products Group';
        discounts.Discount_Percent__c = discountValue;
        insert discounts;

        List<Discount_Entry__c> entries = new List<Discount_Entry__c>();
        for (Id productId : products) {
            Discount_Entry__c entry = new Discount_Entry__c();
            entry.Discounts__c = discounts.Id;
            entry.Product__c = productId;
            entries.add(entry);
        }

        insert entries;

        return true;
    }

    @AuraEnabled
    public static Boolean updateDiscount(Id discountId, String discountName, Decimal discountValue, List<Id> products) {
        List<Discounts__c> discounts = [SELECT Id, Name, Discount_Percent__c FROM Discounts__c WHERE Id=:discountId];
        if (discounts.isEmpty()) {
            return false;
        }

        Discounts__c d = discounts[0];
        d.Name = discountName;
        d.Discount_Percent__c = discountValue;
        update d;

        List<Discount_Entry__c> entries = [SELECT Id FROM Discount_Entry__c WHERE Discounts__c=:discountId];
        delete entries;

        entries = new List<Discount_Entry__c>();
        for (Id productId : products) {
            Discount_Entry__c entry = new Discount_Entry__c();
            entry.Discounts__c = discountId;
            entry.Product__c = productId;
            entries.add(entry);
        }

        insert entries;

        return true;

    }

    @AuraEnabled
    public static Boolean createSingleDiscount(Decimal discountValue, Id productId) {
        List<Product2> products = [SELECT Name FROM Product2 WHERE Id=:productId];
        if (products.isEmpty()) {
            return false;
        }

        Product2 product = products[0];

        Discounts__c discounts = new Discounts__c();
        discounts.Name = product.Name;
        discounts.Type__c = 'Single Product';
        discounts.Discount_Percent__c = discountValue;
        insert discounts;

        Discount_Entry__c entry = new Discount_Entry__c();
        entry.Discounts__c = discounts.Id;
        entry.Product__c = productId;
        insert entry;

        return true;
    }

    @AuraEnabled
    public static Boolean updateSingleDiscount(Id discountId, Decimal discountValue, Id productId) {
        List<Product2> products = [SELECT Name FROM Product2 WHERE Id=:productId];
        if (products.isEmpty()) {
            return false;
        }

        Product2 product = products[0];

        List<Discounts__c> discounts = [SELECT Id, Name, Discount_Percent__c FROM Discounts__c WHERE Id=:discountId];
        if (discounts.isEmpty()) {
            return false;
        }

        Discounts__c d = discounts[0];
        d.Name = product.Name;
        d.Discount_Percent__c = discountValue;
        update d;

        List<Discount_Entry__c> entries = [SELECT Id,Product__c FROM Discount_Entry__c WHERE Discounts__c=:discountId];
        if (entries.isEmpty()) {
            return false;
        }

        Discount_Entry__c entry = entries[0];
        entry.Product__c = productId;
        update entry;

        return true;
    }

    @AuraEnabled
    public static Boolean deleteDiscount(Id id) {
        List<Discount_Entry__c> entries = [SELECT Id FROM Discount_Entry__c WHERE Discounts__c=:id];
        delete entries;

        Database.DeleteResult res = Database.delete(id);
        return res.success;
    }

}