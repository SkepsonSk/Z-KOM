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
                const currentImage = res.getReturnValue().product.Display_Image__c;

                const fetchedImages = res.getReturnValue().images;
                if (fetchedImages.length > 0){

                    if (currentImage) {
                       images.push(currentImage);
                    }

                    fetchedImages.forEach(image => {
                        if (image.ContentDocumentId !== currentImage){
                            images.push(image.ContentDocumentId);
                        }

                    });

                    if (!currentImage) {
                        component.set('v.currentImage', images[0]);
                    }
                    else {
                        component.set('v.currentImage', currentImage);
                    }

                    component.set('v.images', images);

                }

            }
            else {
                alert(state);
                alert(JSON.stringify(res.getError()));
            }

        });

        $A.enqueueAction(action);

    },

    displayImagesModal: function(component) {
        const overlay = component.find('overlayLib');

        const selectedImage = component.get('v.currentImage');
        const images = component.get('v.images');
        const currentIndex = component.get('v.currentIndex');

        $A.createComponent('c:ZK_DisplayImagesModal', {image: selectedImage,
                                                       images: images,
                                                       currentIndex: currentIndex},
        function(component, status) {

            if (status === 'SUCCESS') {
                const modalBody = component;
                overlay.showCustomModal({
                    header: '',
                    body: modalBody,
                    showCloseButton: true,
                    cssClass: 'slds-modal_medium',
                    closeCallback: function() {}
                });

            }
        });
    }

})