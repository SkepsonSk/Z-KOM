({
    doInit: function(component, event, helper) {
        helper.prepareDataTable(component);
        helper.fetchProducts(component);
    },

    onRowAction: function(component, event, helper) {
        const action = event.getParam( 'action' ).name;
        const productId = event.getParam('row').Id;

        if (action === 'edit') {
            helper.edit(component, productId);
        }
        else if (action === 'delete') {
            const productName = event.getParam('row').Name;
            helper.deleteProduct(component, productId, productName);
        }
    },

    handleProductDeleted: function(component, event, helper) {
        const productId = event.getParam('productId');
        helper.handleProductDeleted(component, productId);
    },

    handleProductChanged: function(component, event, helper) {
        helper.fetchProducts(component);
    }

});