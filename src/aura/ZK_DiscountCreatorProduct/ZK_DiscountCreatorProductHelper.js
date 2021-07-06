({
    determineSelected: function(component, product) {
        const selected = component.get('v.selectedProducts');
        const productId = product.product.Id;
        if (selected.indexOf(productId) !== -1){
            component.set('v.selected', true);
        }
    },

    determineCanBeSelected: function(component) {
        const discountId = component.get('v.discountId');
        const productData = component.get('v.productData');
        if (productData.discountId != null && productData.discountId !== discountId) {
            component.set('v.canBeSelected', false);
        }
    },

    prepareImage: function (component, productData) {
        const product = productData.product;
        const images = productData.images;

        if (product.Display_Image__c != null){
            component.set('v.image', '/sfc/servlet.shepherd/document/download/' + product.Display_Image__c);
        }
        else{
            component.set('v.image', '/sfc/servlet.shepherd/document/download/' + images[0].ContentDocumentId);
        }
    },

    handleSelected: function (component, selected) {
        const canBeSelected = component.get('v.canBeSelected');
        if (!canBeSelected){
            return;
        }

        const productId = component.get('v.productData.product.Id');

        const productSelected = component.getEvent('productSelected');
        productSelected.setParams({
            selected: selected,
            productId: productId
        });
        productSelected.fire();

        component.set('v.selected', selected);
    }
});