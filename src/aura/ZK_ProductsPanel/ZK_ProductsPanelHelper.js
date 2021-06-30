({

    showCreationModal : function(component, productId) {
        const overlay = component.find('overlayLib');

        $A.createComponent('c:ZK_ProductCreatorModal', {productId: productId}, function(component, status) {

            if (status === 'SUCCESS') {
                const modalBody = component;
                overlay.showCustomModal({
                    header: 'Add Product',
                    body: modalBody,
                    showCloseButton: true,
                    cssClass: 'slds-modal_medium',
                    closeCallback: function() {}
                });

            }
        });
    },

    showDeleteModal : function(component, productId, productName) {
        const overlay = component.find('overlayLib');

        $A.createComponent('c:ZK_ProductDeleteModal', {
            productId: productId,
            productName: productName
        }, function(component, status) {

            if (status === 'SUCCESS') {
                const modalBody = component;
                overlay.showCustomModal({
                    header: 'Delete Product ' + productName + '?',
                    body: modalBody,
                    showCloseButton: true,
                    cssClass: 'slds-modal_medium',
                    closeCallback: function() {}
                });

            }
        });
    }

});