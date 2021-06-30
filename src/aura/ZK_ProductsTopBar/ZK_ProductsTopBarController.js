({
    onNewProduct: function (component, event, helper) {
        const e = component.getEvent('newProduct');
        e.fire();
    }
});