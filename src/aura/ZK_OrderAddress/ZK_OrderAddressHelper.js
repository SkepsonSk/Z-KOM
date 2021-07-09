({
    prepareAddressObject: function (component) {
        const addressVal = component.get('v.address');
        if (addressVal != null) {
            return;
        }

        const address = {
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: ''
        };
        component.set('v.address', address);
    },

    fireChangeAnotherDeliveryAddress: function (component, anotherDeliveryAddress) {
        const anotherDeliveryAddressChecked = component.getEvent('anotherDeliveryAddressChecked');
        anotherDeliveryAddressChecked.setParams({
            anotherDeliveryAddress: anotherDeliveryAddress
        });
        anotherDeliveryAddressChecked.fire();
    },

    validate: function(component) {
        const street = component.get('v.address.street');
        const city = component.get('v.address.city');
        const state = component.get('v.address.state');
        const postalCode = component.get('v.address.postalCode');
        const country = component.get('v.address.country');

        let valid = true;

        const streetInp = component.find('streetInp');
        if (!street) {
            streetInp.setCustomValidity('Field cannot be blank.');
            valid =  false;
        }
        streetInp.reportValidity();

        const cityInp = component.find('cityInp');
        if (!city) {
            cityInp.setCustomValidity('Field cannot be blank.');
            valid =  false;
        }
        cityInp.reportValidity();

        const stateInp = component.find('stateInp');
        if (!state) {
            stateInp.setCustomValidity('Field cannot be blank.');
            valid =  false;
        }
        stateInp.reportValidity();

        const postalCodeInp = component.find('postalCodeInp');
        if (!postalCode) {
            postalCodeInp.setCustomValidity('Field cannot be blank.');
            valid =  false;
        }
        postalCodeInp.reportValidity();

        const countryInp = component.find('countryInp');
        if (!country) {
            countryInp.setCustomValidity('Field cannot be blank.');
            valid =  false;
        }
        countryInp.reportValidity();

        return valid;
    },

    collectData: function (component) {
        if (!this.validate(component)){
            return;
        }

        const address = component.get('v.address');
        const isDeliveryAddress = component.get('v.isDeliveryAddress');

        const dataCollected = $A.get('e.c:ZK_OrderDataCollected');
        dataCollected.setParams({
            dataType: isDeliveryAddress ? 'deliveryAddress' : 'orderAddress',
            data: address
        });
        dataCollected.fire();
    }
});