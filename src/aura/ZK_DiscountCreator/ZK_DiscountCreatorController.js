({
    doInit: function (component, event, helper) {
        const discountId = component.get('v.discountId');
        if (discountId != null) {
            helper.fetchDiscountAndProducts(component, discountId);
        }
        else {
            helper.fetchProducts(component);
        }
    },

    onAllProductsDiscountSelected: function(component, event, helper) {
        const allProductsDiscount = component.get('v.allProductsDiscount');
        component.set('v.allProductsDiscount', !allProductsDiscount);
    },

    onGoToProducts: function (component, event, helper) {
        if (helper.validateNameAndValue(component)) {
            component.set('v.currentStep', '2');
        }
    },

    onGoBackToInformation: function (component, event, helper) {
        component.set('v.currentStep', '1');
    },

    onFinish: function (component, event, helper) {
        const selectedProducts = component.get('v.selectedProducts');
        const allProductsDiscount = component.get('v.allProductsDiscount');

        if (!helper.validateSelectedProducts(selectedProducts, allProductsDiscount)){
            return;
        }

        const discountId = component.get('v.discountId');
        const discountName = component.get('v.discountName');
        const discountValue = component.get('v.discountValue');

        if (discountId == null) {
            helper.saveDiscount(component, discountName, discountValue, selectedProducts, allProductsDiscount);
        }
        else {
            helper.updateDiscount(component, discountId, discountName, discountValue, selectedProducts, allProductsDiscount);
        }
    },

    onDiscountProductSelected: function (component, event, helper) {
        const selected = event.getParam('selected');
        const productId = event.getParam('productId');
        helper.handleProductSelected(component, selected, productId);
    }
});