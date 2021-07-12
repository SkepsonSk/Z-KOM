({
    fetchComments: function (component, caseId) {

        const action = component.get('c.getComments');
        action.setParams({
            caseId: caseId
        });

        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state === 'SUCCESS') {
                component.set('v.comments', res.getReturnValue());
            }
            else {
                console.log(state);
                console.log(JSON.stringify(res.getError()));
            }
        });

        $A.enqueueAction(action);
    },

    validateMessage: function(component) {
        const messageInput = component.find('messageInput');
        const message = component.get('v.commentBody');

        if (!message) {
            const blankLabel = $A.get('$Label.c.ZK_Error_Blank_Field');
            messageInput.setCustomValidity(blankLabel);
            messageInput.reportValidity();
            return false;
        }
        messageInput.setCustomValidity('');
        messageInput.reportValidity();
        return true;
    },

    sendComment: function (component, caseId, commentBody) {
        if (!this.validateMessage(component)) {
            return;
        }

        const action = component.get('c.sendComment');
        action.setParams({
            caseId: caseId,
            commentBody: commentBody
        });

        action.setCallback(this, function (res) {
            const state = res.getState();
            if (state === 'SUCCESS') {
                this.fetchComments(component, caseId);
            }
            else {
                console.log(state);
                console.log(JSON.stringify(res.getError()));
            }

        });

        $A.enqueueAction(action);
    },

});