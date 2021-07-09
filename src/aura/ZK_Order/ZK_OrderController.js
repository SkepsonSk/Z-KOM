({
    doInit: function (component, event, helper) {
        const cart = component.get('v.cart');

        helper.createOpportunity(component, cart);
    },

    onOrderProductModified: function (component, event, helper) {
        const productId = event.getParam('productId');
        const modificationType = event.getParam('modificationType');
        helper.modifyProduct(component, productId, modificationType, event);
    },

    goToAddressAndPayment: function (component, event, helper) {
        const cart = component.get('v.cart');
        const opportunityId = component.get('v.opportunityId');

        helper.switchStep(component, '2');
        helper.updateOrder(component, opportunityId, cart);
    },

    goToReviewOrder: function (component, event, helper) {
        const addressAndPayment = component.find('addressAndPayment');

        addressAndPayment.collectData();

        component.set('v.hasOrderAddress', false);
        component.set('v.hasPayment', false);
    },

    finalizeOrder: function(component, event, helper) {
        const opportunityId = component.get('v.opportunityId');
        const orderId = component.get('v.orderId');

        helper.close(component, opportunityId, orderId);
        component.set('v.finalized', true);
    },

    onOrderDataCollected: function (component, event, helper) {
        const dataType = event.getParam('dataType');
        const data = event.getParam('data');

        helper.handleDataCollected(component, dataType, data);
    }
});