({

    doInit: function(component, event, helper) {
        helper.fetchCategories(component);
    },

    onSearchClick: function(component, event, helper) {
        const productName = component.get('v.productName');
        const productNameInput = component.find('productNameInput');

        if (!productName) {
            productNameInput.setCustomValidity("Name cannot be blank.");
            productNameInput.reportValidity();
            return;
        }

        productNameInput.setCustomValidity('');
        productNameInput.reportValidity();

        const categoryName = component.get('v.categoryName');
        const mode = helper.defineMode(productName, categoryName);

        component.set('v.productName', '');
        component.set('v.categoryName', 'Everywhere');

        const formData = {
            productName: productName,
            categoryName: categoryName,
            mode: mode
        };

        helper.navigateToProductsSearchPage(component, formData);
    },

    onAllClick: function(component, event, helper) {
        component.set('v.productName', '');
        component.set('v.categoryName', 'Everywhere');

        const formData = {
            productName: '',
            categoryName: '',
            mode: 'all'
        };

        helper.navigateToProductsSearchPage(component, formData);
    },

    resetValidity: function(component, event, helper) {
        const productNameInput = component.find('productNameInput');
        productNameInput.setCustomValidity('');
        productNameInput.reportValidity();
    },

    onCategoryClick: function (component, event, helper) {
        const categoryName = event.currentTarget.dataset.value;

        const formData = {
            productName: '',
            categoryName: categoryName,
            mode: 'all-in-category'
        };

        helper.navigateToProductsSearchPage(component, formData);
    },

});