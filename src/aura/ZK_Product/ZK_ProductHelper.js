({

    determineDisplayImage: function (component, images, product) {
        if (images.length > 0) {

            if (product.Display_Image__c != null){
                component.set('v.image', '/sfc/servlet.shepherd/document/download/' + product.Display_Image__c);
            }
            else{
                component.set('v.image', '/sfc/servlet.shepherd/document/download/' + images[0].ContentDocumentId);
            }
        }
    }

});