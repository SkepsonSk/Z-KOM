({
    onCartClose: function (component, event, helper) {
        component.set('v.cartVisible', false);
    },

    addProduct: function (component, event, helper) {
        const productId = event.target.id;
        helper.changeProductQuantity(component, productId, 1);
    },
    takeProduct: function (component, event, helper) {
        const productId = event.target.id;
        helper.changeProductQuantity(component, productId, -1);
    },

    removeProduct: function(component, event, helper) {
        const productId = event.target.id;
        helper.removeProduct(component, productId);
    },

    recalculateTotalPrice: function (component, event, helper) {
        helper.determineTotalPrice(component);
    },

    onProceedToCashClick: function(component, event, helper) {
        helper.displayOrderModal(component);
    },

    goToProduct: function (component, event, helper) {
        event.stopPropagation();

        const selectedItem = event.currentTarget;
        const recId = selectedItem.dataset.value;

        const navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            'recordId': recId,
            'slideDevName': 'related'
        });
        navEvt.fire();
    }
});