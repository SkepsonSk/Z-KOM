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

            productDataList.add(productData);

        }

        return productDataList;
    }

}