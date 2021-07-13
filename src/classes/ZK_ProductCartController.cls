public with sharing class ZK_ProductCartController {

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
    public static Boolean setProductsCart(List<Object> cart) {
        Cache.SessionPartition sessionPart = Cache.Session.getPartition('local.ZKOM');
        if (sessionPart == null){
            return false;
        }

        sessionPart.remove('cart');
        sessionPart.put('cart', cart);

        return true;
    }

    @AuraEnabled
    public static List<Object> getProductsCart() {
        Cache.SessionPartition sessionPart = Cache.Session.getPartition('local.ZKOM');
        if (sessionPart == null){
            return null;
        }

        return (List<Object>) sessionPart.get('cart');
    }

    @AuraEnabled
    public static void clearProductsCart() {
        Cache.SessionPartition sessionPart = Cache.Session.getPartition('local.ZKOM');
        if (sessionPart == null){
            return;
        }

        sessionPart.remove('cart');
    }

}