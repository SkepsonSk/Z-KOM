({

    doInit: function(component, event, helper) {
        const productId = component.get('v.productId');
        component.set('v.product', productId);

        helper.fetchImages(component, productId);
    },

    selectDisplayImage: function(component, event, helper) {
        const productId = component.get('v.product');
        const imageId = event.target.id;

        helper.selectImage(component, productId, imageId);
    }

})