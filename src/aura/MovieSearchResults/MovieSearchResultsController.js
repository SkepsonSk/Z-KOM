({

    doInit: function(component, event, helper) {
        helper.fetchTrending(component, 0);
        helper.fetchFlagged(component);
    },

    updateSearchQuery : function(component, event, helper) {
        const params = event.getParam('arguments');
        const searchQuery = params.searchQuery;
        const searchMode = params.searchMode;
        const searchType = params.searchType;

        component.set('v.searchQuery', searchQuery);
        component.set('v.searchType', searchType);
        component.set('v.searchMode', searchMode);
        component.set('v.page', 0);

        if (searchQuery) {
            helper.fetchSearchData(component, searchQuery, searchMode, searchType, 0);
        }
        else {
            helper.fetchTrending(component, 0);
        }

    },

    nextPage : function(component, event, helper) {
        const searchQuery = component.get('v.searchQuery');
        const searchMode = component.get('v.searchMode');
        const searchType = component.get('v.searchType');
        const page = component.get('v.page');

        component.set('v.page', page+1);

        if (searchQuery){
            helper.fetchSearchData(component, searchQuery, searchMode, searchType, page+1);
        }
        else {
            helper.fetchTrending(component, page+1);
        }
    },

    previousPage : function(component, event, helper) {
        const searchQuery = component.get('v.searchQuery');
        const searchMode = component.get('v.searchMode');
        const searchType = component.get('v.searchType');
        const page = component.get('v.page');

        component.set('v.page', page-1);

        if (searchQuery){
            helper.fetchSearchData(component, searchQuery, searchMode, searchType, page-1);
        }
        else {
            helper.fetchTrending(component, page-1);
        }

    },

    firstPage : function(component, event, helper) {
        const searchQuery = component.get('v.searchQuery');
        const searchMode = component.get('v.searchMode');
        const searchType = component.get('v.searchType');
        component.set('v.page', 0);

        if (searchQuery){
            helper.fetchSearchData(component, searchQuery, searchMode, searchType, 0);
        }
        else {
            helper.fetchTrending(component, 0);
        }
    },

    lastPage : function(component, event, helper) {
        const searchQuery = component.get('v.searchQuery');
        const searchMode = component.get('v.searchMode');
        const searchType = component.get('v.searchType');
        const lastPage = component.get('v.searchResponse').total_pages-1;

        component.set('v.page', lastPage);

        if (searchQuery){
            helper.fetchSearchData(component, searchQuery, searchMode, searchType, lastPage);
        }
        else {
            helper.fetchTrending(component, lastPage);
        }
    },

    handleFlagged: function(component, event, helper) {
        const mediaId = event.getParam('mediaId');
        const mediaType = event.getParam('mediaType');
        const flagType = event.getParam('flagType');
        const operation = event.getParam('operation');
        const mediaName = event.getParam('mediaName');
        const mediaImageUrl = event.getParam('mediaImageUrl');

        helper.flag(component, mediaId, mediaType, flagType, operation, mediaName, mediaImageUrl);
    }

})