({
    doInit: function (component, event, helper) {
        const redirectToBank = component.get('v.redirectToBank');
        if (redirectToBank){
            helper.redirectToBank();
        }
    }
});