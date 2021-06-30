({

    doInit: function(component, event, helper) {
        const recordId = component.get('v.recordId');
        if (recordId != null) {
            component.set('v.productId', recordId);
        }
    },

    goBack: function(component, event, helper) {
        const productId = component.get('v.productId');
        const currentStep = component.get('v.currentStep');

        if (currentStep === '2'){
            component.set('v.currentStep', '1');
        }
        else if (currentStep === '3'){
            component.set('v.currentStep', '2');
        }
    },

    requestRecordSave: function(component, event, helper) {
        const infoForm = component.find('productInformationForm');
        infoForm.save();
    },

    requestSelectDisplayImage: function(component, event, helper) {
        component.set('v.currentStep', '3');
    },

    onProductSaved: function(component, event, helper) {
        component.set('v.currentStep', '2');
        const id = event.getParam('productId');
        component.set('v.productId', id);
    },

    finish: function(component, event, helper) {

        const productId = component.get('v.productId');
        const recordId = component.get('v.recordId');

        if (recordId != null) {
            const navEvt = $A.get("e.force:navigateToSObject");
            navEvt.setParams({
               recordId: recordId,
               slideDevName: "Detail"
            });
            navEvt.fire();

            const workspaceAPI = component.find("workspace");
            workspaceAPI.getFocusedTabInfo().then(function(response) {
                const focusedTabId = response.tabId;
                workspaceAPI.closeTab({tabId: focusedTabId});
            })
            .catch(function(error) {
                console.log(error);
            });
        }
        else {
            component.find('overlayLibraryInside').notifyClose();
        }

    }
});