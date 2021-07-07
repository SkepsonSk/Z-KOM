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
                const allProductsDiscount = discount.discounts.All_Products__c;

                component.set('v.discount', res.getReturnValue());
                component.set('v.allProductsDiscount', allProductsDiscount);

                component.set('v.discountName', discount.discounts.Name);
                component.set('v.discountValue', discount.discounts.Discount_Percent__c);
                component.set('v.selectedProducts', discount.selected);

                this.fetchProducts(component);
            }

        });

        $A.enqueueAction(action);
    },

    validateNameAndValue: function(component) {
        const discountName = component.get('v.discountName');
        const discountNameInput = component.find('discountNameInput');
        if (!discountName) {

            const errorLabel = $A.get('$Label.c.ZK_Error_Discount_Name');
            discountNameInput.setCustomValidity(errorLabel);
            discountNameInput.reportValidity();
            return false;
        }
        else {
            discountNameInput.setCustomValidity('');
            discountNameInput.reportValidity();
        }

        const discountValue = component.get('v.discountValue');
        const discountValueInput = component.find('discountValueInput');
        if (!discountValue || (isNaN(discountValue) || isNaN(parseFloat(discountValue))) ||
            (parseFloat(discountValue) < 1 || parseFloat(discountValue) > 99)) {

            const errorLabel = $A.get('$Label.c.ZK_Error_Discount_Value');
            discountValueInput.setCustomValidity(errorLabel);
            discountValueInput.reportValidity();
            return false;
        }
        else {
            discountValueInput.setCustomValidity('');
            discountValueInput.reportValidity();
        }

        return true;
    },

    validateSelectedProducts: function(selectedProducts, allProductsDiscount) {
        if (selectedProducts.length === 0 && !allProductsDiscount) {
            const titleLabel = $A.get('$Label.c.ZK_Title_Error');
            const messageLabel = $A.get('$Label.c.ZK_Message_Discount_Product_Not_Selected');

            this.sendMessage(titleLabel, messageLabel, 'error');
            return false;
        }
        return true;
    },

    saveDiscount: function (component, discountName, discountValue, selectedProducts, allProductsDiscount) {
        const action = component.get('c.createDiscount');

        action.setParams({
            discountName: discountName,
            discountValue: discountValue,
            products: allProductsDiscount ? [] : selectedProducts
        });

        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state === 'SUCCESS') {
                const productsChanged = $A.get('e.c:ZK_DiscountsChanged');
                productsChanged.fire();

                const overlayLib = component.find('overlayLibInner');
                overlayLib.notifyClose();

                const titleLabel = $A.get('$Label.c.ZK_Title_Discount_Created');
                const messageLabel = $A.get('$Label.c.ZK_Message_Discount_Created');
                this.sendMessage(titleLabel, messageLabel, 'success');
            }
            else {
                alert(state);
                alert(JSON.stringify(res.getError()));
            }
        });

        $A.enqueueAction(action);
    },

    updateDiscount: function(component, discountId, discountName, discountValue, selectedProducts, allProductsDiscount){
        const action = component.get('c.updateDiscount');
        action.setParams({
            discountId: discountId,
            discountName: discountName,
            discountValue: discountValue,
            products: allProductsDiscount ? [] : selectedProducts
        });

        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state === 'SUCCESS') {
                const productsChanged = $A.get('e.c:ZK_DiscountsChanged');
                productsChanged.fire();

                const overlayLib = component.find('overlayLibInner');
                overlayLib.notifyClose();

                const titleLabel = $A.get('$Label.c.ZK_Title_Discount_Created');
                const messageLabel = $A.get('$Label.c.ZK_Message_Discount_Updated');
                this.sendMessage(titleLabel, messageLabel, 'success');
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
    },

    sendMessage: function(title, message, type) {
        const messageToast = $A.get('e.force:showToast');
        messageToast.setParams({
            title: title,
            message: message,
            type: type
        });
        messageToast.fire();
    }
});