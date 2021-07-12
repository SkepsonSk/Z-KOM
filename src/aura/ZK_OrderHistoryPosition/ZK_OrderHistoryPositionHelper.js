({
    openCaseModal: function (component, orderId) {
        const overlayLib = component.find('overlayLib');

        $A.createComponent('c:ZK_ComplaintForm', {orderId: orderId}, function(component, status) {
            if (status === 'SUCCESS') {
                overlayLib.showCustomModal({
                    header: 'Create Case',
                    body: component,
                    showCloseButton: true,
                    cssClass: 'slds-modal_medium',
                    closeCallback: function() {}
                });

            }
        });
    }

});