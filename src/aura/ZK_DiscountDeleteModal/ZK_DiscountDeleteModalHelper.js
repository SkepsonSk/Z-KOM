({
    handleDelete: function (component, discountId) {
        const action = component.get('c.deleteDiscount');
        action.setParams({
            id: discountId
        });

        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state === 'SUCCESS') {
                const productsChanged = $A.get('e.c:ZK_DiscountsChanged');
                productsChanged.fire();


                const overlayLib = component.find('overlayLibInner');
                overlayLib.notifyClose();

                this.sendSuccessMessage();
            }
        });

        $A.enqueueAction(action);
    },

    sendSuccessMessage: function () {
        const titleLabel = $A.get('$Label.c.ZK_Title_Deletion_Successful');
        const messageLabel = $A.get('$Label.c.ZK_Message_Discount_Deleted.');

        const messageToast = $A.get('e.force:showToast');
        messageToast.setParams({
            title: titleLabel,
            message: messageLabel,
            type: 'success'
        });
        messageToast.fire();
    },

});