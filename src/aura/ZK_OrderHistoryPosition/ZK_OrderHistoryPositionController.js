({
   onCreateCaseClick: function (component, event, helper) {
        const orderId = component.get('v.orderPosition.order.Id');
        alert(orderId);
        helper.openCaseModal(component, orderId);
   }

});