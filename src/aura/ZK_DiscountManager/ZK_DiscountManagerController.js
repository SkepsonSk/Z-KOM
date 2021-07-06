({
    doInit: function (component, event, helper) {
        helper.fetchDiscounts(component);
        helper.prepareDataTable(component);
    },

    onNewSingleClick: function(component, event, helper) {
        helper.showCreatorModal(component, null);
    },
    onNewGroupClick: function(component, event, helper) {
        helper.showSingleCreatorModal(component, null);
    },

    onRowAction: function (component, event, helper) {
        helper.handleRowActions(component, event);
    },

    onDiscountsChanged: function (component, event, helper) {
        helper.fetchDiscounts(component);
    }
});