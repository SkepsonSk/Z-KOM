({
    doInit: function (component, event, helper) {
        const searchQueryJson = sessionStorage.getItem('customSearch--recordIds');
        if (!$A.util.isUndefinedOrNull(searchQueryJson)) {
            const searchQuery = JSON.parse(searchQueryJson);
            helper.initializeData(component, searchQuery);
        }
    }

});