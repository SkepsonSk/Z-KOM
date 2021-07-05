({
   edit: function (component, reviewId) {
        const reviewEdited = component.getEvent('reviewEdited');
        reviewEdited.setParams({
           reviewId: reviewId
        });
       reviewEdited.fire();
   }
});