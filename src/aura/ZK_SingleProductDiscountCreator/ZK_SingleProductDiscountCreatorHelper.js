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

        });

        $A.enqueueAction(action);
    },

    validateDiscountValue: function(component){
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
    },

    saveDiscount: function (component, discountValue, productId) {
        if (!this.validateDiscountValue(component)) {
            return;
        }

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

                const titleLabel = $A.get('$Label.c.ZK_Title_Discount_Created');
                const messageLabel = $A.get('$Label.c.ZK_Message_Discount_Created');
                this.sendMessage(titleLabel, messageLabel, 'success');
            }
        });

        $A.enqueueAction(action);
    },

    updateDiscount: function (component, discountId, discountValue, productId) {
        if (!this.validateDiscountValue(component)) {
            return;
        }

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

                const titleLabel = $A.get('$Label.c.ZK_Title_Discount_Created');
                const messageLabel = $A.get('$Label.c.ZK_Message_Discount_Updated');
                this.sendMessage(titleLabel, messageLabel, 'success');
            }

        });

        $A.enqueueAction(action);
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