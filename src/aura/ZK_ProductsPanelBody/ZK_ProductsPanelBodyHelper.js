({

    prepareDataTable: function(component) {
        const editLabel = $A.get('$Label.c.ZK_Action_Edit');
        const deleteLabel = $A.get('$Label.c.ZK_Action_Delete');

        const actions = [
            {label: editLabel, name: 'edit'},
            {label: deleteLabel, name: 'delete'}
        ];

        const columnName = $A.get('$Label.c.ZK_Column_Product_Name');
        const columnCode = $A.get('$Label.c.ZK_Column_Product_Code');
        const columnCategory = $A.get('$Label.c.ZK_Column_Product_Category');
        const columnWarranty = $A.get('$Label.c.ZK_Column_Product_Warranty');

        component.set('v.columns', [
            {label: columnName, fieldName: 'linkName', type: 'url',
                typeAttributes: {label: { fieldName: columnName }}},

            {label: columnCode, fieldName: 'ProductCode', type: 'text'},
            {label: columnCategory, fieldName: 'Category__c', type: 'text'},
            {label: columnWarranty, fieldName: 'Warranty_in_Months__c', type: 'text'},

            {type: 'action', typeAttributes: {rowActions: actions }}
        ]);
    },

    fetchProducts: function(component) {
        const action = component.get('c.getProducts');
        action.setCallback(this, res => {

            const state = res.getState();

            if (state === 'SUCCESS') {

                const products = res.getReturnValue();
                products.forEach(p => {
                    p.linkName = '/' + p.Id;
                });

                component.set('v.products', products);
            }
            else {
                this.sendErrorToast();
            }

        });

        $A.enqueueAction(action);
    },

    edit: function(component, productId) {
        const e = component.getEvent('newProduct');
        e.setParams({
            productId: productId
        });

        e.fire();
    },

    deleteProduct: function(component, productId, productName) {
        const e = component.getEvent('deleteProduct');
        e.setParams({
            productId: productId,
            productName: productName
        });

        e.fire();
    },

    handleProductDeleted: function(component, productId) {
        const products = component.get('v.products');

        let index = -1;
        for (let i = 0 ; i < products.length ; i++) {
            if (products[i].Id === productId){
                index = i;
                break;
            }
        }

        if (index > -1) {
            products.splice(index, 1);
            component.set('v.products', products);
        }
    },

    sendErrorToast: function () {
        const titleLabel = $A.get('$Label.c.ZK_Message_Title_Error');
        const messageLabel = $A.get('$Label.c.ZK_Message_Error_Fetching_Products');

        const toastEvent = $A.get('e.force:showToast');
        toastEvent.setParams({
            title: titleLabel,
            message: messageLabel,
            type: 'error'
        });
        toastEvent.fire();
    }

});