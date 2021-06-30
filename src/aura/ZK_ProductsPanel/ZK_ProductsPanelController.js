({

    onNewProduct: function (component, event, helper) {
        const productId = event.getParam('productId');
        helper.showCreationModal(component, productId);
    },

    onDeleteProduct: function(component, event, helper) {
        const productId = event.getParam('productId');
        const productName = event.getParam('productName');

        helper.showDeleteModal(component, productId, productName);
    }

});