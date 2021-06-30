({

    doInit: function(component, event, helper) {
        const id = component.get('v.recordId');
        helper.fetchCategories(component);
        helper.loadRecord(component, id);
    },

    doSaveRecord: function(component, event, helper) {
        helper.saveRecord(component);
    }

})