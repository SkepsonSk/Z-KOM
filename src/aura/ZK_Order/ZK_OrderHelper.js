({
    modifyProduct: function (component, productId, modificationType, event) {
        const cart = component.get('v.cart');
        for (let i = 0 ; i < cart.length ; i++) {
            if (cart[i].Id === productId) {
                if (modificationType === 'set') {
                    cart[i].Amount = event.getParam('amount');
                }
                else {
                    cart[i].Amount += (modificationType === 'added' ? 1 : -1);
                }
            }
        }
        component.set('v.cart', cart);

    },

    switchStep: function (component, currentStep) {
        component.set('v.currentStep', currentStep);
    },

    canProceedToOrderReview: function(component) {
        const hasOrderAddress = component.get('v.hasOrderAddress');
        const hasPayment = component.get('v.hasPayment');
        return hasOrderAddress && hasPayment;
    },

    handleDataCollected: function (component, dataType, data) {
        if (dataType === 'payment') {
            component.set('v.paymentMethodName', data.paymentMethod);
            component.set('v.paymentData', data.paymentMethodData);
            component.set('v.hasPayment', true);
        }
        else if (dataType === 'orderAddress') {
            component.set('v.orderAddress', data);
            this.updateContactAddress(component, dataType, data);
            component.set('v.hasOrderAddress', true);
        }
        else if (dataType === 'deliveryAddress') {
            component.set('v.deliveryAddress', data);
            this.updateContactAddress(component, dataType, data);
        }

        if (this.canProceedToOrderReview(component)) {
            const opportunityId = component.get('v.opportunityId');
            this.createOrder(component, opportunityId);

            component.set('v.currentStep', '3');
        }
    },

    updateContactAddress: function(component, addressType, address) {
        const action = component.get('c.updateContactAddress');
        action.setParams({
            addressType: addressType,
            address: address
        });

        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state !== 'SUCCESS') {
                alert(state);
                alert(JSON.stringify(res.getError()));
            }
        });

        $A.enqueueAction(action);
    },

    createOpportunity: function (component, cart) {
        const action = component.get('c.createOpportunity');
        action.setParams({
            cart: cart
        });

        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state === 'SUCCESS') {
                component.set('v.opportunityId', res.getReturnValue());
            }
            else {
                alert(state);
                alert(JSON.stringify(res.getError()));
            }

        });

        $A.enqueueAction(action);
    },

    createOrder: function(component, opportunityId) {
        const action = component.get('c.createOrder');
        action.setParams({
            opportunityId: opportunityId
        });

        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state === 'SUCCESS') {
                component.set('v.orderId', res.getReturnValue());
            }
            else {
                alert(state);
                alert(JSON.stringify(res.getError()));
            }
        });

        $A.enqueueAction(action);
    },

    updateOrder: function (component, opportunityId, cart) {
        const action = component.get('c.updateProducts');
        action.setParams({
            opportunityId: opportunityId,
            cart: cart
        });

        action.setCallback(this, function (res) {

            const state = res.getState();

            if (state !== 'SUCCESS') {
                alert(state);
                alert(JSON.stringify(res.getError()));
            }

        });

        $A.enqueueAction(action);
    },

    close: function (component, opportunityId, orderId) {
        const action = component.get('c.close');
        action.setParams({
            opportunityId: opportunityId,
            orderId: orderId
        });

        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state !== 'SUCCESS') {
                alert(state);
                alert(JSON.stringify(res.getError()));
            }

        });

        $A.enqueueAction(action);
    }
});