({

    fetchAllProducts: function (component) {
        component.set('v.loading', true);

        const action = component.get('c.listProducts');
        action.setCallback(this, res => {
            const state = res.getState();

            if (state === 'SUCCESS') {
                component.set('v.products', res.getReturnValue());

            }

            component.set('v.loading', false);
        });

        $A.enqueueAction(action);
    },

    fetchProductsByName: function (component, productName) {
        component.set('v.loading', true);

        const action = component.get('c.listProductsByName');
        action.setParams({
            name: productName
        });

        action.setCallback(this, res => {
            const state = res.getState();

            if (state === 'SUCCESS') {
                component.set('v.products', res.getReturnValue());

            }

            component.set('v.loading', false);
        });

        $A.enqueueAction(action);

    },

    fetchProductsByCategory: function (component, categoryName) {
        component.set('v.loading', true);

        const action = component.get('c.listProductsByCategory');
        action.setParams({
            category: categoryName
        });

        action.setCallback(this, res => {
            const state = res.getState();

            if (state === 'SUCCESS') {
                component.set('v.products', res.getReturnValue());
            }

            component.set('v.loading', false);
        });

        $A.enqueueAction(action);

    },

    fetchProductsByNameAndCategory: function (component, productName, categoryName) {
        component.set('v.loading', true);

        const action = component.get('c.listProductsByNameAndCategory');
        action.setParams({
            name: productName,
            category: categoryName
        });

        action.setCallback(this, res => {
            const state = res.getState();

            if (state === 'SUCCESS') {
                component.set('v.products', res.getReturnValue());
            }

            component.set('v.loading', false);
        });

        $A.enqueueAction(action);
    }

});