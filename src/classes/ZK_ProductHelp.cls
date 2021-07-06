public with sharing class ZK_ProductHelp {

    public static List<ZK_ProductsController.ProductData> parseEntries(List<PricebookEntry> entries) {
        List<ZK_ProductsController.ProductData> productDataList = new List<ZK_ProductsController.ProductData>();

        List<Id> ids = new List<Id>();
        for (PricebookEntry entry : entries) {
            ids.add(entry.Product2Id);
        }

        if (ids.isEmpty()) {
            return productDataList;
        }

        List<Discount_Entry__c> discountEntries = [SELECT Product__r.Name,Discounts__r.Name,Discounts__r.Type__c,Discounts__r.Discount_Percent__c FROM Discount_Entry__c];

        List<ContentDocumentLink> documents
                = [SELECT ContentDocumentId, LinkedEntityId FROM ContentDocumentLink WHERE LinkedEntityId IN :ids];

        for (PricebookEntry entry : entries) {

            ZK_ProductsController.ProductData productData = new ZK_ProductsController.ProductData();
            productData.product = entry.Product2;
            productData.unitPrice = entry.UnitPrice;
            productData.images = new List<ContentDocumentLink>();

            for (ContentDocumentLink link : documents) {
                if (link.LinkedEntityId == entry.Product2Id){
                    productData.images.add(link);
                }
            }

            for (Discount_Entry__c discountEntry : discountEntries) {
                if (discountEntry.Product__c == entry.Product2.Id) {
                    productData.discountId = discountEntry.Discounts__r.Id;
                    productData.discountName = discountEntry.Discounts__r.Name;
                    productData.discountPercent = discountEntry.Discounts__r.Discount_Percent__c;
                    productData.discountType = discountEntry.Discounts__r.Type__c;
                    productData.unitPriceDiscount = entry.UnitPrice - entry.UnitPrice * (productData.discountPercent/100);
                    break;
                }
            }

            productDataList.add(productData);
        }

        return productDataList;
    }

}