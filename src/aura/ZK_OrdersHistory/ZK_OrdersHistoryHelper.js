({
    fetchOrdersHistory: function (component) {
        const action = component.get('c.getOrdersHistory');
        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state === 'SUCCESS') {
                component.set('v.orders', res.getReturnValue());
            }
            else {
                console.log(state);
                console.log(JSON.stringify(res.getError()));
            }

        });

        $A.enqueueAction(action);
    }
});