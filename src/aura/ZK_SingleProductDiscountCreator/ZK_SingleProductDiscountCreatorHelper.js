({
    fetchProducts: function (component) {
        const action = component.get('c.listProducts');
        action.setCallback(this, function(res) {
            const state = res.getState();

            if (state === 'SUCCESS'){
                component.set('v.products', res.getReturnValue());
            }
        });

        $A.enqueueAction(action);
    },

    fetchDiscountAndProducts: function(component, discountId) {
        const action = component.get('c.getDiscount');
        action.setParams({
            id: discountId
        });

        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state === 'SUCCESS') {
                const discount = res.getReturnValue();

                component.set('v.discountName', discount.discounts.Name);
                component.set('v.discountValue', discount.discounts.Discount_Percent__c);
                component.set('v.selectedProducts', discount.selected);

                this.fetchProducts(component);
            }
            else {
                alert(state);
                alert(JSON.stringify(res.getError()));
            }
        });

        $A.enqueueAction(action);
    },

    saveDiscount: function (component, discountValue, productId) {
        const action = component.get('c.createSingleDiscount');
        action.setParams({
            discountValue: discountValue,
            productId: productId
        });

        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state === 'SUCCESS'){
                const productsChanged = $A.get('e.c:ZK_DiscountsChanged');
                productsChanged.fire();

                const overlayLib = component.find('overlayLibInner');
                overlayLib.notifyClose();
            }
            else {
                alert(state);
                alert(JSON.stringify(res.getError()));
            }
        });

        $A.enqueueAction(action);
    },

    updateDiscount: function (component, discountId, discountValue, productId) {
        const action = component.get('c.updateSingleDiscount');
        action.setParams({
            discountId: discountId,
            discountValue: discountValue,
            productId: productId
        });

        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state === 'SUCCESS'){
                const productsChanged = $A.get('e.c:ZK_DiscountsChanged');
                productsChanged.fire();

                const overlayLib = component.find('overlayLibInner');
                overlayLib.notifyClose();
            }
            else {
                alert(state);
                alert(JSON.stringify(res.getError()));
            }
        });

        $A.enqueueAction(action);
    }
});