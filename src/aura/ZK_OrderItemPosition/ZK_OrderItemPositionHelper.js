({
    determineImage: function (component) {
        const orderItem = component.get('v.orderItem');

        if (orderItem.item.Product2.Display_Image__c != null) {
            component.set('v.image', '/sfc/servlet.shepherd/document/download/' + orderItem.item.Product2.Display_Image__c);
        }
        else {
            component.set('v.image', '/sfc/servlet.shepherd/document/download/' + orderItem.images[0]);
        }
    }
});