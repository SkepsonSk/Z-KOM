({

    fetchCategories: function(component) {

        const action = component.get('c.getCategoriesPickList');
        action.setCallback(this, res => {

            const state = res.getState();

            if (state === 'SUCCESS') {
                component.set('v.categories', res.getReturnValue());
            }
            else {
                console.log(res.getError());
            }

        });

        $A.enqueueAction(action);

    },

    navigateToProductsSearchPage: function(component, formData) {
        sessionStorage.setItem('customSearch--recordIds', JSON.stringify(formData));

        const navEvt = $A.get('e.force:navigateToURL');
        navEvt.setParams({url: '/products'});
        navEvt.fire();
    },

    defineMode: function(name, category) {
        if (name && category === 'Everywhere') {
            return 'name-only';
        }
        else if (!name && category !== 'Everywhere') {
            return 'all-in-category';
        }
        else if (name && category !== 'Everywhere'){
            return 'name-in-category';
        }
        else {
            return 'all';
        }
    }

});