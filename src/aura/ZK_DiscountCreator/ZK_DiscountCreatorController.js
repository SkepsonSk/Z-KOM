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

    onGoToProducts: function (component, event, helper) {
        component.set('v.currentStep', '2');
    },

    onGoBackToInformation: function (component, event, helper) {
        component.set('v.currentStep', '1');
    },

    onFinish: function (component, event, helper) {
        const discountId = component.get('v.discountId');
        const discountName = component.get('v.discountName');
        const discountValue = component.get('v.discountValue');
        const selectedProducts = component.get('v.selectedProducts');

        if (discountId == null) {
            helper.saveDiscount(component, discountName, discountValue, selectedProducts);
        }
        else {
            helper.updateDiscount(component, discountId, discountName, discountValue, selectedProducts);
        }
    },

    onDiscountProductSelected: function (component, event, helper) {
        const selected = event.getParam('selected');
        const productId = event.getParam('productId');
        helper.handleProductSelected(component, selected, productId);
    }
});