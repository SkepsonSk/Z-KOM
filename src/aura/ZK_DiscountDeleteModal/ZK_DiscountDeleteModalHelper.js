({
    handleDelete: function (component, discountId) {
        const action = component.get('c.deleteDiscount');
        action.setParams({
            id: discountId
        });

        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state === 'SUCCESS') {
                const overlayLib = component.find('overlayLibInner');
                overlayLib.notifyClose();
            }
        });

        $A.enqueueAction(action);
    }
});