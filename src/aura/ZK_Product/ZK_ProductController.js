({

    doInit: function (component, event, helper) {

        const images = component.get('v.images');
        const product = component.get('v.product');

        if (images.length > 0) {

           if (product.Display_Image__c != null){
               component.set('v.image', '/sfc/servlet.shepherd/document/download/' + product.Display_Image__c);
           }
           else{
               component.set('v.image', '/sfc/servlet.shepherd/document/download/' + images[0]);
           }

        }

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

    }

});