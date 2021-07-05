({
   edit: function (component, reviewId) {
        const reviewEdited = component.getEvent('reviewEdited');
        reviewEdited.setParams({
           reviewId: reviewId
        });
       reviewEdited.fire();
   },

    displayDeleteModal: function (component, reviewId) {
        const overlay = component.find('overlayLib');

        $A.createComponent('c:ZK_DeleteReviewModal', {reviewId: reviewId}, function(component, status) {

            if (status === 'SUCCESS') {
                overlay.showCustomModal({
                    header: 'Delete review?',
                    body: component,
                    showCloseButton: true,
                    cssClass: 'slds-modal_medium',
                    closeCallback: function() {}
                });

            }
        });
    }
});