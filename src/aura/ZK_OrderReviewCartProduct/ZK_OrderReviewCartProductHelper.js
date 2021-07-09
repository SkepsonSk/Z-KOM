({
    modifyProduct: function (component, productId, modificationType) {
        const amount = component.get('v.product').Amount;

        if (modificationType === 'taken' && amount <= 1) {
            return;
        }

        const productModified = $A.get('e.c:ZK_OrderProductModified');
        productModified.setParams({
            productId: productId,
            modificationType: modificationType
        });
        productModified.fire();
    },

    resetProduct: function (component, productId) {
        const originalProduct = component.get('v.originalProduct');
        const productModified = $A.get('e.c:ZK_OrderProductModified');
        productModified.setParams({
            productId: productId,
            modificationType: 'set',
            amount: originalProduct.Amount
        });
        productModified.fire();
    }
});