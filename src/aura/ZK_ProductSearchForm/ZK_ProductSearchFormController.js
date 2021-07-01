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

        const searchFormSubmitted = component.getEvent('searchFormSubmitted');
        searchFormSubmitted.setParams({
            productName: productName,
            categoryName: categoryName,
            mode: mode
        });

        searchFormSubmitted.fire();
    },

    onAllClick: function(component, event, helper) {
        const searchFormSubmitted = component.getEvent('searchFormSubmitted');
        searchFormSubmitted.setParams({
            productName: '',
            categoryName: '',
            mode: 'all'
        });
    },

    resetValidity: function(component, event, helper) {
        const productNameInput = component.find('productNameInput');
        productNameInput.setCustomValidity('');
        productNameInput.reportValidity();
    },

    onCategoryClick: function (component, event, helper) {
        const categoryName = event.currentTarget.dataset.value;

        const searchFormSubmitted = component.getEvent('searchFormSubmitted');
        searchFormSubmitted.setParams({
            productName: '',
            categoryName: categoryName,
            mode: 'all-in-category'
        });

        searchFormSubmitted.fire();
    }

})