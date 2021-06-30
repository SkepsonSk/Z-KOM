({

    fetchTrending : function(component, page) {
        this.showSpinner(component);

        const action = component.get('c.getTrendingMedia');
        action.setParams({
            page: page
        });

        action.setCallback(this, function(res) {

            const state = res.getState();

            if (state == 'SUCCESS') {
                component.set('v.searchResponse', res.getReturnValue());
            }

            this.hideSpinner(component);

        });

        $A.enqueueAction(action);
    },

    fetchFlagged: function(component) {
        const action = component.get('c.getFlags');
        action.setCallback(this, function(res) {

            const state = res.getState();

            if (state === 'SUCCESS') {
                component.set('v.flags', res.getReturnValue());
            }
            else {
                alert(JSON.stringify(res.getError()));
            }

        });

        $A.enqueueAction(action);
    },

    fetchSearchData: function(component, searchQuery, searchMode, searchType, page) {
        this.showSpinner(component);

        const action = component.get('c.getMedia');
        action.setParams({
           'searchQuery': searchQuery,
           'searchMode': searchMode,
           'searchType': searchType,
           'page': page
        });

        action.setCallback(this, function(res) {

            const state = res.getState();

            if (state == 'SUCCESS') {
                component.set('v.searchResponse', res.getReturnValue());
            }
            else {
                alert(JSON.stringify(res.getError()));
            }

            this.hideSpinner(component);

        });

        $A.enqueueAction(action);

    },

    flag: function(component, mediaId, mediaType, flagType, operation, mediaName, mediaImageUrl) {

        if (operation === 'flag') {
            const action = component.get('c.flag');
            action.setParams({
                flagType: flagType,
                mediaId: mediaId,
                mediaType: mediaType,
                mediaName: mediaName,
                mediaImageUrl: mediaImageUrl
            });

            action.setCallback(this, function(res) {

                const state = res.getState();

                if (state === 'SUCCESS') {
                    const flags = component.get('v.flags');
                    flags.push(res.getReturnValue());
                    component.set('v.flags', flags);
                }
                else {
                    alert(JSON.stringify(res.getError()));
                }

            });

            $A.enqueueAction(action);
        }
        else {

            const action = component.get('c.unFlag');
            action.setParams({
                flagType: flagType,
                mediaId: mediaId,
                mediaType: mediaType
            });

            action.setCallback(this, function(res) {

                const state = res.getState();

                if (state === 'SUCCESS') {
                    const flags = component.get('v.flags');
                    flags.push(res.getReturnValue());
                    component.set('v.flags', flags);
                }
                else {
                    alert(JSON.stringify(res.getError()));
                }

            });

            $A.enqueueAction(action);

        }

    },

    showSpinner: function(component) {
        const spinner = component.find('spinner');
        if ($A.util.hasClass(spinner, 'dl-none')) {
            $A.util.toggleClass(spinner, 'dl-none');
        }
    },
    hideSpinner: function(component) {
        const spinner = component.find('spinner');
        if (!$A.util.hasClass(spinner, 'dl-none')) {
            $A.util.toggleClass(spinner, 'dl-none');
        }
    }
})