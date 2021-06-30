({

    cancelDelete: function(component, event, helper) {
        const lib = component.find('overlayLibraryInner');
        lib.notifyClose();
    },

    confirmDelete: function(component, event, helper) {
        const productId = component.get('v.productId');
        helper.deleteProduct(component, productId);
    }

})