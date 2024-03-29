({

    selectImage: function(component, event, helper) {
        const imageId = event.target.id;
        const selectedImage = component.get('v.image');

        if (selectedImage === imageId || !imageId){
            return;
        }

        const images = component.get('v.images');

        component.set('v.image', imageId);
        component.set('v.currentIndex', images.indexOf(imageId));
    },

    nextImage: function(component, event, helper) {
        event.stopPropagation();

        const index = component.get('v.currentIndex');
        const images = component.get('v.images');

        if (index === images.length-1) {
            component.set('v.currentIndex', 0);
            component.set('v.image', images[0]);
        }
        else {
            component.set('v.currentIndex', index+1);
            component.set('v.image', images[index+1]);
        }
    },

    previousImage: function(component, event, helper) {
        event.stopPropagation();

        const index = component.get('v.currentIndex');
        const images = component.get('v.images');

        if (index === 0) {
            component.set('v.currentIndex', images.length-1);
            component.set('v.image', images[images.length-1]);
        }
        else {
            component.set('v.currentIndex', index-1);
            component.set('v.image', images[index-1]);
        }
    },

})