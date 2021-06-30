({

    doInit: function(component, event, helper) {

        const actions = [
            {label: 'Edit', name: 'edit'},
            {label: 'Delete', name: 'delete'}
        ];

        component.set('v.columns', [
            {label: 'Name', fieldName: 'linkName', type: 'url',
            typeAttributes: {label: { fieldName: 'Name' }}},

            {label: 'Product Code', fieldName: 'ProductCode', type: 'text'},

            {type: 'action', typeAttributes: {rowActions: actions }}
        ]);

        helper.fetchProducts(component);
    },

    onRowAction: function(component, event, helper) {
        const action = event.getParam( 'action' ).name;
        const productId = event.getParam('row').Id;

        if (action === 'edit') {
            helper.edit(component, productId);
        }
        else if (action === 'delete') {
            const productName = event.getParam('row').Name;
            helper.deleteProduct(component, productId, productName);
        }
    },

    handleProductDeleted: function(component, event, helper) {
        const productId = event.getParam('productId');
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

    handleProductChanged: function(component, event, helper) {
        helper.fetchProducts(component);
    }

});