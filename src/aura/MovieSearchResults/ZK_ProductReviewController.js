({
    doInit: function (component, event, helper) {
        const fullName = component.get('v.review.CreatedBy.Name');
        helper.createInitials(component, fullName);
    }
});