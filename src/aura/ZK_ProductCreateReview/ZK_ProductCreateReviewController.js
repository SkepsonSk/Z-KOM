({
    doInit: function (component, event, helper) {
        const productId = component.get('v.productId');
        const reviewId = component.get('v.reviewId');

        helper.loadRecord(component, productId, reviewId);
    },

    onPostClick: function (component, event, helper) {
        const productId = component.get('v.productId');
        helper.saveRecord(component, productId);
    }

})