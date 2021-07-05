({

    doInit: function(component, event, helper) {
        const productId = component.get('v.recordId');
        helper.fetchImages(component, productId);
    },

    selectImage: function(component, event, helper) {
        const imageId = event.target.id;
        const selectedImage = component.get('v.currentImage');

        if (selectedImage === imageId || !imageId){
            return;
        }

        const images = component.get('v.images');

        component.set('v.currentImage', imageId);
        component.set('v.currentIndex', images.indexOf(imageId));
    },

    nextImage: function(component, event, helper) {
        event.stopPropagation();

        const index = component.get('v.currentIndex');
        const images = component.get('v.images');

        helper.nextImage(component, images, index);
    },
    previousImage: function(component, event, helper) {
        event.stopPropagation();

        const index = component.get('v.currentIndex');
        const images = component.get('v.images');

        helper.previousImage(component, images, index);
    },

    displayImage: function(component, event, helper) {
        helper.displayImagesModal(component);
    }


})