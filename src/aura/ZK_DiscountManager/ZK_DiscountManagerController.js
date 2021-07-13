({
    doInit: function (component, event, helper) {
        helper.fetchDiscounts(component);
        helper.prepareDataTable(component);
    },

    onNewDiscountClick: function(component, event, helper) {
        helper.showCreatorModal(component, null);
    },

    onActivitySwitch: function(component, event, helper) {
        const discountId = event.target.id;
        helper.switchActivity(component, discountId);

        const reloadRequested = $A.get('e.c:ZK_ProductsReloadRequested');
        reloadRequested.fire();
    },

    onDiscountEdit: function(component, event, helper) {
        const discountId = event.target.id;
        helper.showCreatorModal(component, discountId);
    },

    onDiscountDelete: function(component, event, helper) {
        const target  = event.currentTarget;
        const name = target.dataset.value;
        const id = event.target.id;
        helper.showDeleteModal(component, name, id);
    },

    onDiscountsChanged: function (component, event, helper) {
        helper.fetchDiscounts(component);

        const reloadRequested = $A.get('e.c:ZK_ProductsReloadRequested');
        reloadRequested.fire();
    }
});