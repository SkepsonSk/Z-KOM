public with sharing class FM_UserController {

    @AuraEnabled
    public static String getProfile(Id id) {
        User user = [SELECT Profile.Name FROM User WHERE Id=:id LIMIT 1];
        return user.Profile.Name;
    }

}