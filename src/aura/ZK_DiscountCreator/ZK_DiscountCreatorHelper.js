({
    fetchProducts: function (component) {
        const action = component.get('c.listProducts');
        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state === 'SUCCESS') {
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

                component.set('v.discount', res.getReturnValue());

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

    saveDiscount: function (component, discountName, discountValue, selectedProducts) {
        const action = component.get('c.createDiscount');
        action.setParams({
            discountName: discountName,
            discountValue: discountValue,
            products: selectedProducts
        });

        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state === 'SUCCESS') {
                const productsChanged = $A.get('e.c:ZK_DiscountsChanged');
                productsChanged.fire();

                const overlayLib = component.find('overlayLibInner');
                overlayLib.notifyClose();
            }
        });

        $A.enqueueAction(action);
    },

    updateDiscount: function(component, discountId, discountName, discountValue, selectedProducts){
        const action = component.get('c.updateDiscount');
        action.setParams({
            discountId: discountId,
            discountName: discountName,
            discountValue: discountValue,
            products: selectedProducts
        });

        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state === 'SUCCESS') {
                const productsChanged = $A.get('e.c:ZK_DiscountsChanged');
                productsChanged.fire();

                const overlayLib = component.find('overlayLibInner');
                overlayLib.notifyClose();
            }
        });

        $A.enqueueAction(action);
    },

    handleProductSelected: function (component, selected, productId) {
        if (selected) {
            const selectedProducts = component.get('v.selectedProducts');
            selectedProducts.push(productId);
            component.set('v.selectedProducts', selectedProducts);
        } else {
            const selectedProducts = component.get('v.selectedProducts');
            selectedProducts.splice(selectedProducts.indexOf(productId), 1);
            component.set('v.selectedProducts', selectedProducts);
        }
    }
});