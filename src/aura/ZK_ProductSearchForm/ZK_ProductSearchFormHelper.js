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