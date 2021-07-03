({
   fetchCurrentUserProfile: function (component) {
        const action = component.get('c.getCurrentProfile');
        action.setCallback(this, function(res) {
            const state = res.getState();

            if (state === 'SUCCESS') {
                component.set('v.userProfile', res.getReturnValue());
            }
        });

        $A.enqueueAction(action);
   }
});