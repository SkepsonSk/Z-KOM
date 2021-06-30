({

    fetchImages: function(component, productId) {

        const action = component.get('c.getImages');
        action.setParams({
           productId: productId
        });

        action.setCallback(this, function(res) {

           const state = res.getState();

           if (state === 'SUCCESS') {

               const images = component.get('v.images');

               res.getReturnValue().forEach(doc => {
                   images.push(doc.ContentDocumentId);
               });

               component.set('v.images', images);

           }

        });

        $A.enqueueAction(action);

    },

    deleteImage: function(component, imageId, productId) {

        const action = component.get('c.handleDeleteImage');
        action.setParams({
           imageId: imageId,
           productId: productId
        });

        action.setCallback(this, function(res) {

            const state = res.getState();

            if (state === 'SUCCESS') {
                const result = res.getReturnValue();

                const images = component.get('v.images');
                images.splice(images.indexOf(imageId), 1);
                component.set('v.images', images);
            }
            else {
                console.log(res.getError());
            }

        });

        $A.enqueueAction(action);

    }

})