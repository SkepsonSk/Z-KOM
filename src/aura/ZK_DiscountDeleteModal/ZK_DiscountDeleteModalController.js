({

    cancelDelete: function (component, event, helper) {
        const overlayLib = component.find('overlayLibInner');
        overlayLib.notifyClose();
    },

    confirmDelete: function (component, event, helper) {
        const discountId = component.get('v.discountId');
        helper.handleDelete(component, discountId);
    }

});