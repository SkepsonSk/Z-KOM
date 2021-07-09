({
    doInit: function (component, event, helper) {
        helper.prepareBanksData(component);
    },

    onTabChange: function(component, event, helper) {
        component.set('v.selectedPaymentMethodData', null);
    },

    onBankSelected: function (component, event, helper) {
        const currentTarget = event.currentTarget;
        const bankId = currentTarget.dataset.value;
        component.set('v.selectedPaymentMethodData', bankId);
    },
    onOtherSelected: function (component, event, helper) {
        const currentTarget = event.currentTarget;
        const typeId = currentTarget.dataset.value;
        component.set('v.selectedPaymentMethodData', typeId);
    },

    onDataCollectRequest: function (component, event, helper) {
        helper.collectData(component);
    }
});