({

    doInit: function(component, event, helper) {
        const productId = component.get('v.recordId');

        helper.fetchCurrentProfile(component);
        helper.fetchReviews(component, productId);
    },

    onNewReviewClick: function (component, event, helper) {
        const productId = component.get('v.recordId');
        helper.openNewReviewModal(component, productId, null);
    },

    onReviewUpdated: function (component, event, helper) {
        const productId = component.get('v.recordId');
        helper.fetchReviews(component, productId);
    }
});