({

    fetchProducts: function(component) {

        const action = component.get('c.getProducts');
        action.setCallback(this, res => {

            const state = res.getState();

            if (state === 'SUCCESS') {

                const products = res.getReturnValue();
                products.forEach(p => {
                    p.linkName = '/' + p.Id;
                });

                component.set('v.products', products);
            }
            else {
                alert(state);
                alert(JSON.stringify(res.getError()));
            }

        });

        $A.enqueueAction(action);
    },

    edit: function(component, productId) {
        const e = component.getEvent('newProduct');
        e.setParams({
            productId: productId
        });

        e.fire();
    },

    deleteProduct: function(component, productId, productName) {
        const e = component.getEvent('deleteProduct');
        e.setParams({
            productId: productId,
            productName: productName
        });

        e.fire();
    }

});