({
    doInit: function (component, event, helper) {
        const caseId = component.get('v.case.Id');
        helper.fetchComments(component, caseId);
    },

    onSendCommentClick: function (component, event, helper) {
        const caseId = component.get('v.case.Id');
        const commentBody = component.get('v.commentBody');
        helper.sendComment(component, caseId, commentBody);
    }
});