public with sharing class ZK_ProductsController {

    public class ProductData {
        @AuraEnabled public Product2 product;
        @AuraEnabled public List<ContentDocumentLink> images;
        @AuraEnabled public Decimal unitPrice;
    }

    @AuraEnabled
    public static List<Product2> getProducts() {
        return [SELECT Id,ProductCode,Category__c,Name FROM Product2];
    }

    @AuraEnabled
    public static List<ContentDocumentLink> getImages(Id productId) {
        return [SELECT ContentDocumentId, LinkedEntityId FROM ContentDocumentLink where LinkedEntityId=:productId];
    }

    @AuraEnabled
    public static Boolean updateDisplayImage(Id productId, Id imageId) {
        List<Product2> product = [SELECT Display_Image__c FROM Product2 WHERE Id=:productId];
        if (product.isEmpty()){
            return false;
        }

        product[0].Display_Image__c = imageId;
        Database.SaveResult[] res = Database.update(product);

        return res[0].success;
    }

    @AuraEnabled
    public static ProductData getProductData(Id productId) {
        List<Product2> product = [SELECT Display_Image__c FROM Product2 WHERE Id=:productId];
        if (product.isEmpty()){
            return null;
        }

        ProductData productData = new ProductData();

        productData.product = product[0];
        productData.images = [SELECT ContentDocumentId, LinkedEntityId FROM ContentDocumentLink where LinkedEntityId=:productId];

        return productData;
    }

    @AuraEnabled
    public static Boolean deleteProduct(Id productId) {
        Database.DeleteResult res = Database.delete(productId);
        return res.success;
    }

    @AuraEnabled
    public static Boolean handleDeleteImage(Id imageId, Id productId) {

        List<Product2> product = [SELECT Display_Image__c FROM Product2 WHERE Id=:productId];
        if (!product.isEmpty()){

            String displayImage = product[0].Display_Image__c;
            if (displayImage == imageId) {
                product[0].Display_Image__c = null;
                update product[0];
            }

        }

        Database.DeleteResult res = Database.delete(imageId);
        return res.success;
    }

    @AuraEnabled
    public static List<String> getCategoriesPickList(){
        List<String> optionList = new List<String>();
        Map<String,Schema.SObjectType> gd = Schema.getGlobalDescribe();

        Map<String, Schema.SObjectField> field_map = gd.get('Product2').getDescribe().fields.getMap();
        List<Schema.PicklistEntry> picklistValues = field_map.get('Category__c').getDescribe().getPickListValues();

        for (Schema.PicklistEntry pv : picklistValues) {
            optionList.add(pv.getValue());
        }

        return optionList;
    }

    @AuraEnabled
    public static List<ProductData> listProducts() {
        ZK_Main_Price_Book__c pb = ZK_Main_Price_Book__c.getOrgDefaults();
        String priceBookName = pb.Name__c;

        List<PricebookEntry> entries = [SELECT Id,Product2.Name,Product2.Warranty_in_Months__c,Product2.ProductCode,
                Product2.Category__c,Product2.Display_Image__c,UnitPrice FROM PricebookEntry WHERE Pricebook2.Name=:priceBookName];
        return ZK_ProductHelp.parseEntries(entries);
    }

    @AuraEnabled
    public static List<ProductData> listProductsByName(String name) {
        ZK_Main_Price_Book__c pb = ZK_Main_Price_Book__c.getOrgDefaults();
        String priceBookName = pb.Name__c;

        name = String.escapeSingleQuotes(name);
        name = '%' + name + '%';

        List<PricebookEntry> entries =
        [SELECT Id,Product2.Name,Product2.Warranty_in_Months__c,Product2.ProductCode,Product2.Category__c,Product2.Display_Image__c,UnitPrice
        FROM PricebookEntry WHERE Product2.Name LIKE :name AND Pricebook2.Name=:priceBookName];

        return ZK_ProductHelp.parseEntries(entries);
    }

    @AuraEnabled
    public static List<ProductData> listProductsByNameAndCategory(String name, String category) {
        ZK_Main_Price_Book__c pb = ZK_Main_Price_Book__c.getOrgDefaults();
        String priceBookName = pb.Name__c;

        name = String.escapeSingleQuotes(name);
        name = '%' + name + '%';

        category = String.escapeSingleQuotes(category);

        List<PricebookEntry> entries =
        [SELECT Id,Product2.Name,Product2.Warranty_in_Months__c,Product2.ProductCode,Product2.Category__c,Product2.Display_Image__c,UnitPrice
        FROM PricebookEntry WHERE Product2.Category__c=:category AND Product2.Name LIKE :name AND Pricebook2.Name=:priceBookName];

        return ZK_ProductHelp.parseEntries(entries);
    }

    @AuraEnabled
    public static List<ProductData> listProductsByCategory(String category) {
        ZK_Main_Price_Book__c pb = ZK_Main_Price_Book__c.getOrgDefaults();
        String priceBookName = pb.Name__c;

        category = String.escapeSingleQuotes(category);

        List<PricebookEntry> entries =
        [SELECT Id,Product2.Name,Product2.Warranty_in_Months__c,Product2.ProductCode,Product2.Category__c,Product2.Display_Image__c,UnitPrice
        FROM PricebookEntry WHERE Product2.Category__c LIKE :category AND Pricebook2.Name=:priceBookName];

        return ZK_ProductHelp.parseEntries(entries);
    }

}