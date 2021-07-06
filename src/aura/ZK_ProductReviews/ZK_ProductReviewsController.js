({

    doInit: function(component, event, helper) {
        const productId = component.get('v.recordId');

        helper.fetchCurrentProfile(component);
        helper.fetchCurrentUserId(component);
        helper.fetchProfilesSetting(component);
        helper.fetchReviews(component, productId);
        helper.fetchAverageRating(component, productId);
    },

    onNewReviewClick: function (component, event, helper) {
        const productId = component.get('v.recordId');
        const reviewId = event.getParam('reviewId');

        helper.openNewReviewModal(component, productId, reviewId);
    },

    onReviewUpdated: function (component, event, helper) {
        const productId = component.get('v.recordId');
        helper.fetchReviews(component, productId);
        helper.fetchAverageRating(component, productId);
    }
});