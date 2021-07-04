({
    handleProductSaved: function(component, event) {
        component.set('v.currentStep', '2');
        const id = event.getParam('productId');
        component.set('v.productId', id);
    },

    handleGoBack: function (component, currentStep) {
       if (currentStep === '2'){
           component.set('v.currentStep', '1');
       }
       else if (currentStep === '3'){
           component.set('v.currentStep', '2');
       }
    },

    handleFinish: function (component, productId, recordId) {
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

           const navEvt = $A.get("e.force:navigateToURL");
           navEvt.setParams({
               url: '/' + recordId,
           });
           navEvt.fire();

       }
    }

});