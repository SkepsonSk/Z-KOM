({
    doInit: function (component, event, helper) {
        helper.prepareAddressObject(component);
    },

    onAnotherDeliveryAddressChecked: function (component, event, helper) {
        const anotherDeliveryAddress = component.find('anotherDeliveryAddressCheckbox').get('v.checked');
        helper.fireChangeAnotherDeliveryAddress(component, anotherDeliveryAddress);
    },

    onDataCollectRequest: function (component, event, helper) {
        helper.collectData(component);
    }
});