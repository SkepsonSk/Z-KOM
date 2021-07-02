public with sharing class ZK_ProductReviewsController {

    @AuraEnabled
    public static List<Product_Review__c> getReviews(Id productId) {
        return [SELECT Rating__c, Text_Review__c,CreatedBy.Name,CreatedBy.SmallPhotoUrl
        FROM Product_Review__c WHERE Product__c=:productId];
    }

    @AuraEnabled
    public static Profile getCurrentProfile() {
        String profileId = UserInfo.getProfileId();
        Profile profile = [SELECT Name FROM Profile WHERE Id=:profileId LIMIT 1];
        return profile;
    }

}