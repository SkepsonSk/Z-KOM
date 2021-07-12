({
    doInit: function (component, event, helper) {
        helper.fetchCases(component);
        helper.fetchCurrentUserId(component);
    },

    onCaseClick: function (component, event, helper) {
        const caseId = event.currentTarget.dataset.value;
        helper.openCaseDetailsModal(component, caseId);
    },

    onCaseCreated: function (component, event, helper) {
        helper.fetchCases(component);
    }
});