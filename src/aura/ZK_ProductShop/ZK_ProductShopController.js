({
   doInit: function (component, event, helper) {
        helper.fetchProfilesSetting(component);
        helper.fetchCurrentUserProfile(component);
   },
});