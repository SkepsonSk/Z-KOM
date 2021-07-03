({
    loadRecord: function (component, productId, reviewId) {
        if (reviewId != null) {
            return;
        }

        const editor = component.find('recordEditor');
        editor.getNewRecord(
            'Product_Review__c',
            null,
            false,
            $A.getCallback(function() {
                const rec = component.get('v.record');
                const error = component.get('v.recordError');

                component.find('productIdInput').set('v.value', productId);

                if(error || (rec === null)) {
                    console.log('Error initializing record template: ' + error);
                }
                else {
                    console.log('Record template initialized: ' + rec.apiName);
                }
            })
        );
    },

    saveRecord: function (component, productId) {
        const recordEditor = component.find('recordEditor');

        recordEditor.saveRecord(function(saveResult) {

            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {

                const reviewsUpdated = $A.get('e.c:ZK_ReviewsUpdated');
                reviewsUpdated.fire();

                const titleLabel = $A.get('$Label.c.ZK_Toast_Review_Posted');
                const messageLabel = $A.get('$Label.c.ZK_Toast_Thanks_For_Review');

                const toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: titleLabel,
                    message: messageLabel,
                    type: 'success'
                });
                toastEvent.fire();

                const overlayLibInner = component.find('overlayLibInner');
                overlayLibInner.notifyClose();

            }
            else {
                alert(JSON.stringify(saveResult.error));
            }

        });
    }
})