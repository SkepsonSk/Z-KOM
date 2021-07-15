({
    doInit: function (component, event, helper) {
        const searchQueryJson = sessionStorage.getItem('customSearch--recordIds');
        if (!$A.util.isUndefinedOrNull(searchQueryJson)) {
            const searchQuery = JSON.parse(searchQueryJson);
            helper.initializeData(component, searchQuery);
        }
    },

    onSortingChanged: function (component, event, helper) {
        const sortingMode = component.get('v.sorting');
        helper.sort(component, sortingMode);
    }

});