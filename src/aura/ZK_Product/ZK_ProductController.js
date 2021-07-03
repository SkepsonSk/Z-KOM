({

    doInit: function (component, event, helper) {
        const images = component.get('v.images');
        const product = component.get('v.product');

        helper.determineDisplayImage(component, images, product);
    },

    goToProduct: function(component, event, helper) {
        event.stopPropagation();
        const id = component.get('v.product').Id;

        const navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            'recordId': id,
            'slideDevName': 'related'
        });
        navEvt.fire();
    },

    onProductShop: function (component, event, helper) {
        const product = component.get('v.product');

        const productShopped = $A.get('e.c:ZK_ProductShopped');
        productShopped.setParams({
            product: product
        });
        productShopped.fire();
    }

});