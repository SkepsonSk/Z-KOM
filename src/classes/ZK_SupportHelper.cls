public without sharing class ZK_SupportHelper {

    public static Id getCaseAssignmentRuleId() {
        AssignmentRule AR = [
                select id from AssignmentRule
                where SobjectType = 'Case'
                and Active = true
                limit 1
        ];
        return AR.Id;
    }

}