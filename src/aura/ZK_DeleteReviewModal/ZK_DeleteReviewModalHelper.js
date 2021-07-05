({
    handleDeleteReview: function (component, reviewId) {
        const action = component.get('c.deleteReview');
        action.setParams({
            reviewId: reviewId
        });

        action.setCallback(this, function (res) {

            const state = res.getState();

            if (state === 'SUCCESS') {
                const reviewsUpdated = $A.get('e.c:ZK_ReviewsUpdated');
                reviewsUpdated.fire();

                this.sendSuccessToast();
            }
            else {
                this.sendErrorToast();
            }

            const overlay = component.find('overlayLibInner');
            overlay.notifyClose();

        });

        $A.enqueueAction(action);
    },

    sendSuccessToast: function () {
        const toastEvent = $A.get('e.force:showToast');
        toastEvent.setParams({
            title: 'Deleted',
            message: 'The review has been deleted.',
        });
        toastEvent.fire();
    },
    sendErrorToast: function () {
        const toastEvent = $A.get('e.force:showToast');
        toastEvent.setParams({
            title: 'Error',
            message: 'An error occurred while attempting to delete the review.',
            type: 'error'
        });
        toastEvent.fire();
    }
});