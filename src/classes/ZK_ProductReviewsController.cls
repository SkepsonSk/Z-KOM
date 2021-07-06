public with sharing class ZK_ProductReviewsController {

    @AuraEnabled
    public static List<Product_Review__c> getReviews(Id productId) {
        return [SELECT Rating__c, Text_Review__c,CreatedBy.Name,CreatedBy.SmallPhotoUrl
        FROM Product_Review__c WHERE Product__c=:productId];
    }

    @AuraEnabled
    public static ZK_Profiles__c getProfilesSetting() {
        return ZK_Profiles__c.getOrgDefaults();
    }

    @AuraEnabled
    public static Profile getCurrentProfile() {
        String profileId = UserInfo.getProfileId();
        Profile profile = [SELECT Name FROM Profile WHERE Id=:profileId LIMIT 1];
        return profile;
    }

    @AuraEnabled
    public static String getCurrentUserId() {
        String userId = UserInfo.getUserId();
        return userId;
    }

    @AuraEnabled
    public static Integer getAverageRating(Id productId) {
        List<AggregateResult> res = [SELECT AVG(Rating__c) FROM Product_Review__c WHERE Product__c=:productId];
        if (res.isEmpty()) {
            return 0;
        }

        Decimal average = (Decimal) res[0].get('expr0');
        return Integer.valueOf(average.round());
    }

    @AuraEnabled
    public static Boolean deleteReview(Id reviewId) {
        Database.DeleteResult res = Database.delete(reviewId);
        return res.success;
    }

}