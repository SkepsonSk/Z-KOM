({

    fetchCategories: function(component) {

        const action = component.get('c.getCategoriesPickList');
        action.setCallback(this, function(res) {

            const state = res.getState();

            if (state === 'SUCCESS') {
                component.set('v.categories', res.getReturnValue());
            }

        });

        $A.enqueueAction(action);
    },

    validateForm: function(component) {

        const nameInput = component.find('name');
        const name = nameInput.get('v.value');
        if (!name) {
            nameInput.set('v.validity', { valid:false, badInput :true });
            nameInput.showHelpMessageIfInvalid();
            return false;
        }

        const codeInput = component.find('code');
        const code = codeInput.get('v.value');
        if (!code) {
            codeInput.set('v.validity', { valid:false, badInput :true });
            codeInput.showHelpMessageIfInvalid();
            return false;
        }

        const categoryInput = component.find('category');
        const category = categoryInput.get('v.value');
        if (!category) {
            categoryInput.set('v.validity', { valid:false, badInput :true });
            categoryInput.showHelpMessageIfInvalid();
            return false;
        }

        const warrantyInput = component.find('warranty');
        const warranty = warrantyInput.get('v.value');

        if (!warranty) {
            alert('nope');
            warrantyInput.set('v.validity', { valid:false, badInput :true });
            warrantyInput.showHelpMessageIfInvalid();
            return false;
        }

        return true;

    },

    loadRecord: function(component, id) {

        if (id != null) {
            return;
        }

        const editor = component.find('recordEditor');
        editor.getNewRecord(
             'Product2',
             null,
             false,
             $A.getCallback(function() {
                const rec = component.get('v.record');
                const error = component.get('v.recordError');
                if(error || (rec === null)) {
                    console.log('Error initializing record template: ' + error);
                }
                else {
                    console.log('Record template initialized: ' + rec.apiName);
                }
            })
        );

    },

    saveRecord: function(component) {
        if (!this.validateForm(component)){
            return;
        }

        const active = component.find('active').get('v.checked');

        component.set('v.simpleRecord.Id', component.get('v.recordId'));
        component.set('v.simpleRecord.IsActive', active);

        component.find('recordEditor').saveRecord(function(saveResult) {

            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {

                const id = saveResult.recordId;

                const productSavedEvent = component.getEvent('productSaved');
                productSavedEvent.setParams({
                   productId: id
                });
                productSavedEvent.fire();

                const productChangedEvent = $A.get('e.c:ZK_ProductChanged');
                productChangedEvent.fire();

            }
            else {
                alert(JSON.stringify(saveResult.error));
            }

        });

    }

})