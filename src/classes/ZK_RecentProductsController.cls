public with sharing class ZK_RecentProductsController {

    @AuraEnabled
    public static List<ZK_ProductsController.ProductData> getRecentlyViewed() {
        List<RecentlyViewed> recentProducts = [
                SELECT Id, Name FROM RecentlyViewed
                WHERE Type = 'Product2'
                AND LastViewedDate != null
                ORDER BY LastViewedDate DESC
                LIMIT 6
        ];

        List<Id> productsIds = new List<Id>();
        for (RecentlyViewed recentlyViewed : recentProducts) {
            productsIds.add(recentlyViewed.Id);
        }

        List<PricebookEntry> entries = [
                SELECT Id,Product2.Name,Product2.Warranty_in_Months__c,Product2.ProductCode,
                        Product2.Category__c,Product2.Display_Image__c,UnitPrice
                FROM PricebookEntry
                WHERE Pricebook2.IsStandard=true
                AND Pricebook2.IsActive=true
                AND Product2.Id IN :productsIds
        ];

        return ZK_ProductHelp.parseEntries(entries);
    }

}