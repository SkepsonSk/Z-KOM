public with sharing class FM_MediaController {

    @AuraEnabled
    public static FM_Wrappers.SearchResponse getMedia(String searchQuery, String searchMode, String searchType, Integer page) {

        if (searchMode == 'title') {
            return FM_MoviesDataSource.searchFor(searchQuery, page);
        }
        else if (searchMode == 'genre') {
            return FM_MoviesDataSource.discover(searchType, searchQuery, page);
        }

        return null;
    }

    @AuraEnabled
    public static FM_Wrappers.ActorDetails getActorDetails(Integer id) {
        return FM_MoviesDataSource.getActorDetails(id);
    }

    @AuraEnabled
    public static FM_Wrappers.SearchResponse getTrendingMedia(Integer page) {
        return FM_MoviesDataSource.searchTrending(page);
    }

    @AuraEnabled
    public static FM_Wrappers.Credits getCredits(Integer mediaId, String mediaType) {
        return FM_MoviesDataSource.getCredits(mediaId, mediaType);
    }

    @AuraEnabled
    public static List<Local_Review__c> getLocalReviews(Integer mediaId, String mediaType) {
        return [SELECT Name,CreatedBy.Name,Content__c,Rating__c,CreatedBy.SmallPhotoUrl FROM Local_Review__c WHERE Movie_DB_ID__c=:mediaId AND Media_Type__c=:mediaType];
    }

    @AuraEnabled
    public static Local_Review__c getLocalReview(Id id) {
        List<Local_Review__c> reviews = [SELECT Media_Type__c,Movie_DB_ID__c,Name,Content__c,Rating__c,CreatedBy.Name,CreatedBy.SmallPhotoUrl FROM Local_Review__c WHERE Id=:id];

        if (reviews.isEmpty()){
            return null;
        }
        return reviews.get(0);
    }

    @AuraEnabled
    public static Boolean canModerate(Id userId) {
        User user = [SELECT Profile.PermissionsModifyAllData FROM User WHERE Id=:userId LIMIT 1];
        return user.Profile.PermissionsModifyAllData;
    }

    @AuraEnabled
    public static List<Flag__c> getFlags() {
        Id id = UserInfo.getUserId();
        return [SELECT Flag_Type__c,Media_ID__c,Media_Type__c FROM Flag__c WHERE CreatedById=:id];
    }

    @AuraEnabled
    public static Flag__c flag(String flagType, Integer mediaId, String mediaType, String mediaName, String mediaImageUrl) {
        Id userId = UserInfo.getUserId();
        List<Flag__c> flags = [SELECT Id FROM Flag__c WHERE Media_ID__c=:mediaId AND Media_Type__c=:mediaType AND CreatedById=:userId];

        if (!flags.isEmpty()){
            return null;
        }
        else {
            Flag__c flag = new Flag__c();
            flag.Media_ID__c = mediaId;
            flag.Media_Type__c = mediaType;
            flag.Flag_Type__c = flagType;
            flag.Media_Name__c = mediaName;
            flag.Media_Image_URL__c = mediaImageUrl;

            Database.SaveResult res = Database.insert(flag);

            if (!res.isSuccess()) {
                return null;
            }

            return [SELECT Flag_Type__c,Media_ID__c,Media_Type__c FROM Flag__c WHERE Id=:res.id];
        }
    }

    @AuraEnabled
    public static void unFlag(String flagType, Integer mediaId, String mediaType) {
        Id userId = UserInfo.getUserId();
        List<Flag__c> flags = [SELECT Id FROM Flag__c WHERE Media_ID__c=:mediaId AND Media_Type__c=:mediaType AND CreatedById=:userId];
        if (flags.isEmpty()) {
            return;
        }
        else {
            delete flags;
        }

    }

}