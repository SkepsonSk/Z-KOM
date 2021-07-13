({
    fetchContactAddresses: function (component) {
        const action = component.get('c.getContactAddresses');
        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state === 'SUCCESS') {
                const addresses = res.getReturnValue();
                if (addresses.order != null) {
                    component.set('v.orderAddress', addresses.order);
                }
                if (addresses.other != null) {
                    component.set('v.otherAddress', addresses.order);
                }
            }
            else {
                console.log(state);
                console.log(JSON.stringify(res.getError()));
            }
        });

        $A.enqueueAction(action);
    }
});