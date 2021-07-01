({

    doInit: function(component, event, helper) {
        component.set('v.currency', $A.get('$locale.currency'));
        helper.fetchAllProducts(component);
    },

    onSearchFormSubmitted: function (component, event, helper) {
        const productName = event.getParam('productName');
        const categoryName = event.getParam('categoryName');
        const mode = event.getParam('mode');

        const productSearchForm = component.find('productSearchForm');
        productSearchForm.resetValidity();

        if (mode === 'all') {
            helper.fetchAllProducts(component);
        }
        else if (mode === 'name-only'){
            helper.fetchProductsByName(component, productName);
        }
        //TODO remove
        else if (mode === 'all-in-category') {
            helper.fetchProductsByCategory(component, categoryName);
        }
        else if (mode === 'name-in-category') {
            helper.fetchProductsByNameAndCategory(component, productName, categoryName);
        }
    }

});