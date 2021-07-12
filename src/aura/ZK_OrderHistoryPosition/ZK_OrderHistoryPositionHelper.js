({
    openCaseModal: function (component, orderId) {
        const overlayLib = component.find('overlayLib');

        $A.createComponent('c:ZK_ComplaintForm', {orderId: orderId}, function(component, status) {
            if (status === 'SUCCESS') {
                const titleLabel = $A.get('$Label.c.ZK_Title_Create_Case');

                overlayLib.showCustomModal({
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