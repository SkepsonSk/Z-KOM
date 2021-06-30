({

    doInit: function(component, event, helper) {
        const productId = component.get('v.productId');
        helper.fetchImages(component, productId);
    },

    onImagesUploaded: function(component, event, helper) {
        const images = component.get('v.images');
        const uploaded = event.getParam('files');

        uploaded.forEach(img => {
            images.push(img.documentId);
        });

        component.set('v.images', images);
    },

    deleteImage: function(component, event, helper) {
        const productId = component.get('v.productId');
        const imageId = event.target.id;
        helper.deleteImage(component, imageId, productId);
    }

})