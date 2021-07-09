({
    prepareBanksData: function (component) {
        const banks = [];
        banks.push({id: 'mbank', image: $A.get('$Resource.ZK_MBANK')});
        banks.push({id: 'ing', image: $A.get('$Resource.ZK_ING')});
        banks.push({id: 'santander', image: $A.get('$Resource.ZK_Santander')});
        banks.push({id: 'pekao', image: $A.get('$Resource.ZK_PEKAO')});
        banks.push({id: 'pko', image: $A.get('$Resource.ZK_PKO')});
        banks.push({id: 'creditAgricole', image: $A.get('$Resource.ZK_CreditAgricole')});
        component.set('v.banks', banks);
    },

    collectData: function (component) {
        const paymentMethod = component.get('v.selectedPaymentMethod');
        let paymentData;

        if (component.get('v.selectedPaymentMethodData') == null) {
            const toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: 'Error',
                message: 'Please, select payment method.',
                type: 'error'
            });
            toastEvent.fire();
            return;
        }

        if (paymentMethod === 'card') {
            const cardCode = component.get('v.cardCode');
            const cardOwner = component.get('v.cardOwner');
            const cardExpiration = component.get('v.cardExpiration');
            paymentData = {paymentMethod: paymentMethod, paymentData: {
                cardCode: cardCode, cardOwner: cardOwner, cardExpiration: cardExpiration}};
        }
        else if (paymentMethod === 'banking') {
            const paymentMethodData = this.getBankData(component);
            paymentData = {paymentMethod: paymentMethod, paymentMethodData: paymentMethodData};
        }
        else {
            const paymentMethodData = component.get('v.selectedPaymentMethodData');
            paymentData = {paymentMethod: paymentMethod, paymentMethodData: paymentMethodData};
        }

        const dataCollected = $A.get('e.c:ZK_OrderDataCollected');
        dataCollected.setParams({
            dataType: 'payment',
            data: paymentData
        });
        dataCollected.fire();
    },

    getBankData: function (component) {
        const paymentMethodData = component.get('v.selectedPaymentMethodData');

        const banks = component.get('v.banks');
        for (let i = 0 ; i < banks.length ; i++) {
            if (banks[i].id === paymentMethodData) {
                return banks[i];
            }
        }
        return null;
    }
});