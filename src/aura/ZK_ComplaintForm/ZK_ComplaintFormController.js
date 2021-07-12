({
    doInit: function (component, event, helper) {
        helper.fetchTypes(component);
    },

    onCreateCaseClick: function (component, event, helper) {
        helper.createCase(component);
    }
});