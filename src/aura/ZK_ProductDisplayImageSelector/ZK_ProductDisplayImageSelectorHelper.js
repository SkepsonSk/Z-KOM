({

    fetchImages: function(component, productId) {
        const action = component.get('c.getProductData');
        action.setParams({
            productId: productId
        });

        action.setCallback(this, function(res) {

           const state = res.getState();

           if (state === 'SUCCESS') {

               const images = component.get('v.images');

               const val = res.getReturnValue();
               val.images.forEach(image => {
                     images.push(image.ContentDocumentId);
               });

               component.set('v.images', images);
               component.set('v.selectedId', val.product.Display_Image__c);

           }
           else {
               alert(state);
               alert(JSON.stringify(res.getError()));
           }

        });

        $A.enqueueAction(action);
    },

    selectImage: function(component, productId, imageId) {

        const action = component.get('c.updateDisplayImage');
        action.setParams({
           productId: productId,
           imageId: imageId
        });

        action.setCallback(this, function(res) {

            const state = res.getState();

            if (state === 'SUCCESS') {
                component.set('v.selectedId', imageId);
            }
            else {
                alert(state);
                alert(JSON.stringify(res.getError()));
            }

        });

        $A.enqueueAction(action);
    }

})