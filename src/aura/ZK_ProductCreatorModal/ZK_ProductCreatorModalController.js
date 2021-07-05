({
    doInit: function(component, event, helper) {
        const recordId = component.get('v.recordId');
        if (recordId != null) {
            component.set('v.productId', recordId);
        }
    },

    goBack: function(component, event, helper) {
        const currentStep = component.get('v.currentStep');
        helper.handleGoBack(component, currentStep);
    },

    requestRecordSave: function(component, event, helper) {
        const infoForm = component.find('productInformationForm');
        infoForm.save();
    },

    requestSelectDisplayImage: function(component, event, helper) {
        component.set('v.currentStep', '3');
    },

    onProductSaved: function(component, event, helper) {
        helper.handleProductSaved(component, event);
    },

    finish: function(component, event, helper) {
        const productId = component.get('v.productId');
        const recordId = component.get('v.recordId');

        helper.handleFinish(component, productId, recordId);
    }
});