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
        const editLabel = $A.get('$Label.c.ZK_Action_Edit');
        const deleteLabel = $A.get('$Label.c.ZK_Action_Delete');

        const actions = [
            {label: editLabel, name: 'edit'},
            {label: deleteLabel, name: 'delete'}
        ];

        const nameLabel = $A.get('$Label.c.ZK_Action_Discount_Name');
        const percentLabel = $A.get('$Label.c.ZK_Action_Discount_Percent');
        const typeLabel = $A.get('$Label.c.ZK_Action_Discount_Type');

        component.set('v.columns', [
            {label: nameLabel, fieldName: 'Name', type: 'text'},
            {label: percentLabel, fieldName: 'Discount_Percent__c', type: 'percentage'},
            {label: typeLabel, fieldName: 'Type__c', type: 'text'},

            {type: 'action', typeAttributes: {rowActions: actions }}
        ]);

    },

    showCreatorModal: function (component, discountId) {
        const overlay = component.find('overlayLib');

        $A.createComponent('c:ZK_DiscountCreator', {discountId: discountId}, function(component, status) {

            const titleLabel = $A.get('$Label.c.ZK_Title_Discount_Creator');

            if (status === 'SUCCESS') {
                overlay.showCustomModal({
                    header: titleLabel,
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

            const titleLabel = $A.get('$Label.c.ZK_Title_Discount_Creator');

            if (status === 'SUCCESS') {
                overlay.showCustomModal({
                    header: titleLabel,
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

            const titleLabel = $A.get('$Label.c.ZK_Title_Delete');

            if (status === 'SUCCESS') {
                overlay.showCustomModal({
                    header: titleLabel + ' ' + discountName + '?',
                    body: component,
                    showCloseButton: true,
                    cssClass: 'slds-modal_medium',
                    closeCallback: function() {}
                });

            }
        });
    },

    switchActivity: function(component, discountId) {
        const action = component.get('c.switchDiscount');
        action.setParams({
            discountId: discountId
        });

        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state === 'SUCCESS') {

                const response = res.getReturnValue();

                if (response.success !== true) {

                    let conflictMessage = '';

                    const titleLabel = $A.get('$Label.c.ZK_Title_Conflicting_Discounts');
                    const inLabel = $A.get('$Label.c.ZK_Info_Conflict_In_Discount');

                    const keys = Object.keys(response.collidingProducts);
                    keys.forEach(key => {
                        conflictMessage += key + ' ' + inLabel + ' ' + response.collidingProducts[key] + '\n';
                    });

                    this.sendMessage(titleLabel, conflictMessage, 'error', 60*1000);
                    return;
                }

                const discounts = component.get('v.discounts');
                for (let i = 0 ; i < discounts.length ; i++) {
                    const discount = discounts[i];
                    if (discount.Id === discountId) {
                        discount.IsActive = !discount.IsActive;
                        break;
                    }
                }

                component.set('v.discounts', discounts);

                this.sendMessage('Success', 'Activity switched.', 'success', 5000);
            }
        });

        $A.enqueueAction(action);
    },

    sendMessage: function (title, message, type, duration) {
        const toastMessage = $A.get('e.force:showToast');
        toastMessage.setParams({
            title: title,
            message: message,
            type: type,
            duration: duration
        });
        toastMessage.fire();
    }

});