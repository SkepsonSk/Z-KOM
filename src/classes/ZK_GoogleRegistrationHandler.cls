global with sharing class ZK_GoogleRegistrationHandler implements Auth.RegistrationHandler {

    global boolean canCreateUser(Auth.UserData data) {
        Boolean retVal = (data != null
                && data.email != null
                && data.lastName != null
                && data.firstName != null);

        return retVal;
    }

    global User createUser(Id portalId, Auth.UserData data){
        RegistrationData__c regData = RegistrationData__c.getOrgDefaults();

        if(!canCreateUser(data)) {
            return null;
        }

        if(data.attributeMap.containsKey('sfdc_networkid')) {
            String externalUserProfile = regData.External_User_Profile__c;
            String defaultAccountName = regData.Default_Account_Name__c;
            String orgSuffix = regData.Org_Suffix__c;

            Id contactId;
            contactId = createContact(data, defaultAccountName);

            Profile p = [SELECT Id FROM profile WHERE name=:externalUserProfile];

            User u = createUser(data, p, orgSuffix);

            u.contactId = contactId;
            return u;

        } else {
            String internalUserProfile = regData.Internal_User_Profile__c;
            String orgSuffix = regData.Org_Suffix__c;

            Profile p = [SELECT Id FROM profile WHERE name=:internalUserProfile];
            User u = createUser(data, p, orgSuffix);

            return u;
        }
    }

    global void updateUser(Id userId, Id portalId, Auth.UserData data){
        User u = new User(id=userId);
        u.email = data.email;
        u.lastName = data.lastName;
        u.firstName = data.firstName;
        u.communitynickname = data.firstName + ' ' + data.lastName;
        update(u);
    }

    private Id createContact(Auth.UserData data, String defaultAccountName){
        Contact contact = new Contact();
        contact.LastName = data.lastName;
        contact.FirstName = data.firstName;
        contact.Email = data.email;

        if (data.attributemap.get('accountId') != null){
            contact.accountId = data.attributemap.get('accountId');
        } else {
            List<Account> accounts = [select Id from Account where Name =:defaultAccountName];

            contact.accountId = accounts[0].Id;
        }
        insert contact;

        return contact.id;
    }

    private User createUser(Auth.UserData data, Profile p, String orgSuffix) {
        User u = new User();
        u.username = data.email + orgSuffix;
        u.email = data.email;
        u.lastName = data.lastName;
        u.firstName = data.firstName;
        u.communitynickname = data.firstName + ' ' + data.lastName;
        String alias = data.firstName + data.lastName;

        if(alias.length() > 8) {
            alias = alias.substring(0, 8);
        }
        u.alias = alias;
        u.languagelocalekey = UserInfo.getLanguage();
        u.localesidkey = UserInfo.getLocale();
        u.emailEncodingKey = 'UTF-8';
        u.timeZoneSidKey = 'America/Los_Angeles';
        u.profileId = p.Id;
        return u;
    }

}