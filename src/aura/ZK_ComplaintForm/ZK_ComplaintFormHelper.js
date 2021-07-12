({
    validateCaseForm: function(component) {
        let ok = true;

        const subjectInput = component.find('subjectInput');
        const subject = component.get('v.subject');

        const descriptionInput = component.find('descriptionInput');
        const description = component.get('v.description');

        const blankLabel = $A.get('$Label.c.ZK_Error_Blank_Field');
        if (!subject) {
            subjectInput.setCustomValidity(blankLabel);
            ok = false;
        }
        else {
            subjectInput.setCustomValidity('');
        }
        subjectInput.reportValidity();

        if (!description) {
            descriptionInput.setCustomValidity(blankLabel);
            ok = false;
        }
        else {
            descriptionInput.setCustomValidity('');
        }
        descriptionInput.reportValidity();

        return ok;
    },

    createCase: function (component) {
        if (!this.validateCaseForm(component)) {
            return;
        }

        const orderId = component.get('v.orderId');
        const subject = component.get('v.subject');
        const description = component.get('v.description');
        const type = component.get('v.type');

        const action = component.get('c.createNewCase');
        action.setParams({
            orderId: orderId,
            subject: subject,
            description: description,
            type: type,
        });

        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state === 'SUCCESS') {
                const overlayLibInner = component.find('overlayLibInner');
                overlayLibInner.notifyClose();

                const titleLabel = $A.get('$Label.c.ZK_Title_Thank_You');
                const messageLabel = $A.get('$Label.c.ZK_Message_Case_Submitted');

                this.sendMessage(titleLabel, messageLabel, 'success');
            }
            else {
                console.log(state);
                console.log(JSON.stringify(res.getError()));
            }
        });

        $A.enqueueAction(action);
    },

    fetchTypes: function(component) {
        const action = component.get('c.getTypesPicklist');
        action.setCallback(this, function (res) {
            const state = res.getState();
            if (state === 'SUCCESS') {
                component.set('v.types', res.getReturnValue());
            }
            else {
                console.log(state);
                console.log(JSON.stringify(res.getError()));
            }
        });

        $A.enqueueAction(action);
    },

    sendMessage: function (title, message, type) {
        const toastEvent = $A.get('e.force:showToast');
        toastEvent.setParams({
            title: title,
            message: message,
            type: type
        });
        toastEvent.fire();
    }
});