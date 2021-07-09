({
    doInit: function (component, event, helper) {
        const cart = component.get('v.cart');
        helper.calculateTotalPrice(component, cart);
    },

    calculateTotalPrice: function (component, event, helper) {
        const cart = component.get('v.cart');
        helper.calculateTotalPrice(component, cart);
    }
});