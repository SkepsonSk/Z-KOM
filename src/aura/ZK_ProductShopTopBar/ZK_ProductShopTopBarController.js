({
    doInit: function(component, event, helper) {
        helper.fetchCart(component);
    },

    onCartClick: function(component, event, helper){
        component.set('v.cartVisible', true);
    },

    onProductShopped: function (component, event, helper) {
        const product = event.getParam('product');
        const image = event.getParam('image');
        const unitPrice = event.getParam('unitPrice');

        helper.addProductToCart(component, product, image, unitPrice);
    }
});