({
    deleteProduct: function(component, productId) {

        const action = component.get('c.deleteProduct');
        action.setParams({
            productId: productId
        });

        action.setCallback(this, function(res) {

             const state = res.getState();

             if (state === 'SUCCESS') {

                const productDeleted = $A.get('e.c:ZK_ProductDeleted');
                productDeleted.setParams({
                    productId: productId
                });
                productDeleted.fire();

                const lib = component.find('overlayLibraryInner');
                lib.notifyClose();
             }
             else {
                 alert(state);
                 alert(JSON.stringify(res.getError()));
             }

        });

        $A.enqueueAction(action);

    }
})