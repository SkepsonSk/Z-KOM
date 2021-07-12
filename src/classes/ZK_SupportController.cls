public with sharing class ZK_SupportController {

    @AuraEnabled
    public static void createNewCase(String subject, String description, String type) {
        Case c = new Case();
        c.Subject = subject;
        c.Description = description;
        c.Type = type;

        Database.DMLOptions dmlOpts = new Database.DMLOptions();
        dmlOpts.assignmentRuleHeader.assignmentRuleId = ZK_SupportHelper.getCaseAssignmentRuleId();

        c.setOptions(dmlOpts);

        insert c;
    }

    @AuraEnabled
    public static List<String> getTypesPicklist(){
        List<String> optionList = new List<String>();
        Map<String,Schema.SObjectType> gd = Schema.getGlobalDescribe();

        Map<String, Schema.SObjectField> field_map = gd.get('Case').getDescribe().fields.getMap();
        List<Schema.PicklistEntry> picklistValues = field_map.get('Type').getDescribe().getPickListValues();

        for (Schema.PicklistEntry pv : picklistValues) {
            optionList.add(pv.getValue());
        }

        return optionList;
    }

    @AuraEnabled
    public static List<Case> getCases() {
        String email = UserInfo.getUserEmail();

        return [
                SELECT Id,Subject,Type,CreatedDate,Description,Status
                FROM Case
                WHERE IsClosed = false
                AND Contact.Email = :email
                ORDER BY CreatedDate DESC
        ];
    }

    @AuraEnabled
    public static List<CaseComment> getComments(Id caseId){
        return [
                SELECT Id,TYPEOF CreatedBy WHEN User THEN CreatedBy.SmallPhotoUrl,CreatedBy.Name END,CommentBody
                FROM CaseComment
                WHERE Parent.Id=:caseId
                ORDER BY CreatedDate
        ];
    }

    @AuraEnabled
    public static Id getCurrentUserId() {
        return UserInfo.getUserId();
    }

    @AuraEnabled
    public static void sendComment(Id caseId, String commentBody) {
        CaseComment comment = new CaseComment();
        comment.IsPublished = true;
        comment.ParentId = caseId;
        comment.CommentBody = commentBody;
        insert comment;
    }
}