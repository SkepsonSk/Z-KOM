({
    confirmDelete: function (component, event, helper) {
        const reviewId = component.get('v.reviewId');
        helper.handleDeleteReview(component, reviewId);
    },

    cancelDelete: function (component, event, helper) {
        const overlay = component.find('overlayLibInner');
        overlay.notifyClose();
    }
});