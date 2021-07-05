({
    onEditClick: function (component, event, helper) {
        const reviewId = component.get('v.review.Id');
        helper.edit(component, reviewId);
    },

    onDeleteClick: function (component, event, helper) {
        const reviewId = component.get('v.review.Id');
        helper.displayDeleteModal(component, reviewId);
    }
});