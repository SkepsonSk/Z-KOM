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
        const image = component.get('v.image');
        const unitPrice = component.get('v.unitPrice');
        const unitPriceDiscount = component.get('v.unitPriceDiscount');

        const productShopped = $A.get('e.c:ZK_ProductShopped');
        productShopped.setParams({
            product: product,
            image: image,
            unitPrice: unitPrice,
            unitPriceDiscount: unitPriceDiscount
        });
        productShopped.fire();
    }

});