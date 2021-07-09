({
    doInit: function(component, event, helper) {
        const product = component.get('v.product');
        component.set('v.originalProduct', JSON.parse(JSON.stringify(product)));
    },

    onUndo: function(component, event, helper) {
        const productId = component.get('v.product.Id');
        helper.resetProduct(component, productId);
    },

    onProductAdded: function (component, event, helper) {
        const productId = component.get('v.product.Id');
        helper.modifyProduct(component, productId, 'added');
    },
    onProductTaken: function (component, event, helper) {
        const productId = component.get('v.product.Id');
        helper.modifyProduct(component, productId, 'taken');
    }
});