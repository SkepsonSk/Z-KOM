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

    sort: function(component, sortingMode) {
        const products = component.get('v.products');

        if (sortingMode === 'lowest-price') {
            products.sort( (a, b) => {
                const aPrice = a.disountUnitPrice != null ? a.disountUnitPrice : a.unitPrice;
                const bPrice = b.disountUnitPrice != null ? b.disountUnitPrice : b.unitPrice;

                return aPrice > bPrice ? 1 : (bPrice < aPrice ? -1 : 0);
            } );
        }
        else if (sortingMode === 'highest-price') {
            products.sort( (a, b) => {
                const aPrice = a.disountUnitPrice != null ? a.disountUnitPrice : a.unitPrice;
                const bPrice = b.disountUnitPrice != null ? b.disountUnitPrice : b.unitPrice;

                return aPrice < bPrice ? 1 : (bPrice > aPrice ? -1 : 0);
            } );
        }
        else if (sortingMode === 'highest-rating') {
            products.sort( (a, b) => {
                const aRating = a.averageRating != null ? a.averageRating : 0;
                const bRating = b.averageRating != null ? b.averageRating : 0;

                return aRating < bRating ? 1 : (bRating > aRating ? -1 : 0);
            } );
        }
        else if (sortingMode === 'accuracy') {
            const searchQueryJson = sessionStorage.getItem('customSearch--recordIds');
            const searchQuery = JSON.parse(searchQueryJson);
            this.initializeData(component, searchQuery);
        }

        component.set('v.products', products);
    },

    fetchAllProducts: function (component) {
        component.set('v.loading', true);

        const action = component.get('c.listProducts');
        action.setCallback(this, res => {

            const state = res.getState();

            if (state === 'SUCCESS') {
                component.set('v.products', res.getReturnValue());
            }
            else {
                const toast = component.find('toast');
                toast.toast('An error occurred', 'Unable to fetch products', 'error');
                console.log(state);
                console.log(JSON.stringify(res.getError()));
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
            else {
                const toast = component.find('toast');
                toast.toast('An error occurred', 'Unable to fetch products', 'error');
                console.log(state);
                console.log(JSON.stringify(res.getError()));
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
            else {
                const toast = component.find('toast');
                toast.toast('An error occurred', 'Unable to fetch products', 'error');
                console.log(state);
                console.log(JSON.stringify(res.getError()));
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
            else {
                const toast = component.find('toast');
                toast.toast('An error occurred', 'Unable to fetch products', 'error');
                console.log(state);
                console.log(JSON.stringify(res.getError()));
            }

            component.set('v.loading', false);

        });

        $A.enqueueAction(action);

    }
});