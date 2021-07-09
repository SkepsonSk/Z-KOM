({
    onAnotherDeliveryChecked: function (component, event, helper) {
        const anotherDeliveryAddress = event.getParam('anotherDeliveryAddress');
        component.set('v.anotherDeliveryAddress', anotherDeliveryAddress);
    },

    onDataCollect: function (component, event, helper) {
        const orderPayment = component.find('orderPayment');
        const orderAddress = component.find('orderAddress');

        orderPayment.requestDataCollection();
        orderAddress.requestDataCollection();

        const anotherDeliveryAddress = component.get('v.anotherDeliveryAddress');
        if (anotherDeliveryAddress) {
            const deliveryAddress = component.find('deliveryAddress');
            deliveryAddress.requestDataCollection();
        }
    }
});