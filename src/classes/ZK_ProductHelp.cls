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

        List<Pricebook2> allProductsDiscount = [SELECT Name,Discount_Percent__c FROM Pricebook2 WHERE
        IsActive=true AND All_Products__c=true];

        List<PricebookEntry> discountEntries = null;
        if (allProductsDiscount.isEmpty()) {
            discountEntries = [SELECT Product2Id,Pricebook2.Id,UnitPrice,Pricebook2.Discount_Percent__c,Pricebook2.Name
            FROM PricebookEntry WHERE Pricebook2.IsStandard=false AND Pricebook2.IsActive=true];
        }

        List<AggregateResult> averageRatings = [SELECT AVG(Rating__c),Product__c FROM Product_Review__c GROUP BY Product__c];
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

            if (!allProductsDiscount.isEmpty()) {
                Pricebook2 discountAll = allProductsDiscount[0];
                productData.discountId = discountAll.Id;
                productData.discountName = discountAll.Name;
                productData.discountPercent = discountAll.Discount_Percent__c;
                productData.unitPriceDiscount = entry.UnitPrice - entry.UnitPrice*(discountAll.Discount_Percent__c/100);
            }
            else {
                for (PricebookEntry discountEntry : discountEntries) {
                    if (discountEntry.Product2Id == entry.Product2.Id) {
                        productData.discountId = discountEntry.Pricebook2.Id;
                        productData.discountName = discountEntry.Pricebook2.Name;
                        productData.discountPercent = discountEntry.Pricebook2.Discount_Percent__c;
                        productData.unitPriceDiscount = discountEntry.UnitPrice;
                        break;
                    }
                }
            }

            for (AggregateResult res : averageRatings) {
                if (res.get('Product__c') == entry.Product2.Id) {
                    Decimal averageRating = (Decimal) res.get('expr0');
                    productData.averageRating = Integer.valueOf(averageRating.round());
                }
            }

            productDataList.add(productData);
        }

        return productDataList;
    }

}