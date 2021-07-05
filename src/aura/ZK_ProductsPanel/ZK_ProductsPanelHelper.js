({

    showCreationModal : function(component, productId) {
        const overlay = component.find('overlayLib');

        $A.createComponent('c:ZK_ProductCreatorModal', {productId: productId}, function(component, status) {
            const titleLabel = $A.get('$Label.c.ZK_Product_Creator');

            if (status === 'SUCCESS') {
                overlay.showCustomModal({
                    header: titleLabel,
                    body: component,
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
            const titleLabel = $A.get('$Label.c.ZK_Title_Delete_Product') + ' ' + productName + '?';

            if (status === 'SUCCESS') {
                overlay.showCustomModal({
                    header: titleLabel,
                    body: component,
                    showCloseButton: true,
                    cssClass: 'slds-modal_medium',
                    closeCallback: function() {}
                });

            }
        });
    }

});