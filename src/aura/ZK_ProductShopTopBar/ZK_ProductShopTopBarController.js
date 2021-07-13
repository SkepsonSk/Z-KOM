({
    doInit: function(component, event, helper) {
        helper.fetchCart(component);
        helper.fetchProfilesSetting(component);
        helper.fetchCurrentUserProfile(component);
    },

    onCartClick: function(component, event, helper){
        component.set('v.cartVisible', true);
    },

    onProductShopped: function (component, event, helper) {
        const product = event.getParam('product');
        const image = event.getParam('image');
        const unitPrice = event.getParam('unitPrice');
        const unitPriceDiscount = event.getParam('unitPriceDiscount');

        helper.addProductToCart(component, product, image, unitPrice, unitPriceDiscount);
    },

    onOrderFinalized: function (component, event, helper) {
        helper.clearCart(component);
    }
});