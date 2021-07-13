({
    initializeData: function(component, searchQuery) {
        const productName = searchQuery.productName;
        const categoryName = searchQuery.categoryName;
        const mode = searchQuery.mode;

        if (mode === 'all') {
            this.fetchAllProducts(component);
        }
        else if (mode === 'name-only'){
            this.fetchProductsByName(component, productName);
        }
        else if (mode === 'all-in-category') {
            this.fetchProductsByCategory(component, categoryName);
        }
        else if (mode === 'name-in-category') {
            this.fetchProductsByNameAndCategory(component, productName, categoryName);
        }
    },

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