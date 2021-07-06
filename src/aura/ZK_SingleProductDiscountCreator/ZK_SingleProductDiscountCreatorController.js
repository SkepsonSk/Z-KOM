({
    doInit: function (component, event, helper) {
        const discountId = component.get('v.discountId');

        if (discountId != null) {
            helper.fetchDiscountAndProducts(component, discountId);
        } else {
            helper.fetchProducts(component);
        }
    },

    onDiscountProductSelected: function (component, event, helper) {
        const discountId = component.get('v.discountId');
        const discountValue = component.get('v.discountValue');
        const productId = event.getParam('productId');

        if (discountId == null) {
            helper.saveDiscount(component, discountValue, productId);
        }
        else {
            helper.updateDiscount(component, discountId, discountValue, productId);
        }
    }
});