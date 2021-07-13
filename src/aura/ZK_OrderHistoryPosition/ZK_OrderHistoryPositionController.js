({
   onCreateCaseClick: function (component, event, helper) {
        const orderId = component.get('v.orderPosition.order.Id');
        helper.openCaseModal(component, orderId);
   }

});