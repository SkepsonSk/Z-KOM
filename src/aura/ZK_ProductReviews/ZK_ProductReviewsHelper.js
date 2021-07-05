({
    fetchCurrentProfile: function(component) {
        const action = component.get('c.getCurrentProfile');
        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state === 'SUCCESS') {
                component.set('v.currentProfile', res.getReturnValue());
            }
        });

        $A.enqueueAction(action);
    },

    fetchReviews: function(component, productId) {
        const action = component.get('c.getReviews');
        action.setParams({
            productId: productId
        });

        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state === 'SUCCESS') {
                component.set('v.reviews', res.getReturnValue());
            }
            else {
                alert(state);
                alert(JSON.stringify(res.getError()));
            }
        });

        $A.enqueueAction(action);
    },

    openNewReviewModal: function (component, productId, reviewId) {
        const overlay = component.find('overlayLib');

        $A.createComponent('c:ZK_ProductCreateReview', {productId: productId, reviewId: reviewId}, function(component, status) {

            const titleLabel = $A.get('$Label.c.ZK_Title_Review_Creator');

            if (status === 'SUCCESS') {
                overlay.showCustomModal({
                    header: titleLabel,
                    body: component,
                    showCloseButton: true,
                    cssClass: 'slds-modal_medium',
                    closeCallback: function() {}
                });

            }
        });
    }

})