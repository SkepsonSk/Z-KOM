({
    fetchCases: function (component) {
        const action = component.get('c.getCases');
        action.setCallback(this, function (res) {
            const state = res.getState();

            const closedCases = [];
            const openCases = [];

            if (state === 'SUCCESS') {
                const cases = res.getReturnValue();
                component.set('v.cases',cases);

                for (let i = 0 ; i < cases.length ; i++) {
                    if (cases[i].Status === 'Closed') {
                        closedCases.push(cases[i]);
                    }
                    else {
                        openCases.push(cases[i]);
                    }
                }

                component.set('v.openCases', openCases);
                component.set('v.closedCases', closedCases);
            }
            else {
                console.log(state);
                console.log(JSON.stringify(res.getError()));
            }
        });

        $A.enqueueAction(action);
    },

    fetchCurrentUserId: function(component) {
        const action = component.get('c.getCurrentUserId');
        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state === 'SUCCESS') {
                component.set('v.currentUserId', res.getReturnValue());
            }
            else {
                console.log(state);
                console.log(JSON.stringify(res.getError()));
            }
        });

        $A.enqueueAction(action);
    },

    openCaseDetailsModal: function (component, caseId) {
        const overlay = component.find('overlayLib');
        const caseParam = this.getCaseById(component, caseId);
        const currentUserId = component.get('v.currentUserId');

        $A.createComponent('c:ZK_CaseDetails', {case: caseParam, currentUserId: currentUserId}, function(component, status) {

            const titleLabel = caseParam.Subject;

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
    },

    getCaseById: function (component, caseId) {
        const cases = component.get('v.cases');
        for (let i = 0 ; i < cases.length ; i++){
            if (cases[i].Id === caseId){
                return cases[i];
            }
        }
        return null;
    }
});