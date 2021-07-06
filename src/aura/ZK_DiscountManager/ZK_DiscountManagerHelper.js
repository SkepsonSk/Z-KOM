({
    fetchDiscounts: function(component) {
        const action = component.get('c.getDiscounts');

        action.setCallback(this, function (res) {
            const state = res.getState();
            if (state === 'SUCCESS') {
                component.set('v.discounts', res.getReturnValue());
            }
            else {
                alert(state);
                alert(JSON.stringify(res.getError()));
            }
        });

        $A.enqueueAction(action);
    },

    prepareDataTable: function (component) {
        const actions = [
            {label: 'Edit', name: 'edit'},
            {label: 'Delete', name: 'delete'}
        ];

        component.set('v.columns', [
            {label: 'Discount Name', fieldName: 'Name', type: 'text'},
            {label: 'Discount Percent (%)', fieldName: 'Discount_Percent__c', type: 'percentage'},
            {label: 'Discount Type', fieldName: 'Type__c', type: 'text'},

            {type: 'action', typeAttributes: {rowActions: actions }}
        ]);

    },

    showCreatorModal: function (component, discountId) {
        const overlay = component.find('overlayLib');

        $A.createComponent('c:ZK_DiscountCreator', {discountId: discountId}, function(component, status) {

            if (status === 'SUCCESS') {
                overlay.showCustomModal({
                    header: 'Discount Creator',
                    body: component,
                    showCloseButton: true,
                    cssClass: 'slds-modal_medium',
                    closeCallback: function() {}
                });

            }
        });
    },
    showSingleCreatorModal: function (component, discountId) {
        const overlay = component.find('overlayLib');

        $A.createComponent('c:ZK_SingleProductDiscountCreator', {discountId: discountId}, function(component, status) {

            if (status === 'SUCCESS') {
                overlay.showCustomModal({
                    header: 'Discount Creator',
                    body: component,
                    showCloseButton: true,
                    cssClass: 'slds-modal_medium',
                    closeCallback: function() {}
                });

            }
        });
    },
    showDeleteModal: function (component, discountName, discountId) {
        const overlay = component.find('overlayLib');

        $A.createComponent('c:ZK_DiscountDeleteModal', {discountId: discountId, discountName: discountName}, function(component, status) {

            if (status === 'SUCCESS') {
                overlay.showCustomModal({
                    header: 'Delete ' + discountName + '?',
                    body: component,
                    showCloseButton: true,
                    cssClass: 'slds-modal_medium',
                    closeCallback: function() {}
                });

            }
        });
    },

    handleRowActions: function (component, event) {
        const action = event.getParam('action').name;
        const discountId = event.getParam('row').Id;

        if (action === 'edit') {
            const type = event.getParam('row').Type__c;

            if (type === 'Single Product') {
                this.showSingleCreatorModal(component, discountId);
            }
            else{
                this.showCreatorModal(component, discountId);
            }
        }
        else if (action === 'delete') {
            const name = event.getParam('row').Name;
            const id = event.getParam('row').Id;
            this.showDeleteModal(component, name, id);
        }
    }

});