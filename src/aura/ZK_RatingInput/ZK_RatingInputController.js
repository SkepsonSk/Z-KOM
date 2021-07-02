({


    onRate: function (component, event, helper) {
        const readOnly = component.get('v.readOnly');
        if (readOnly){
            return;
        }

        const rate = event.target.id;
        component.set('v.rating', rate);
    },

    setTempRate: function(component, event, helper) {
        const readOnly = component.get('v.readOnly');
        if (readOnly){
            return;
        }

        const rate = event.target.id;
        component.set('v.tempRating', rate);
    },

    resetTempRate: function(component, event, helper) {
        const readOnly = component.get('v.readOnly');
        if (readOnly){
            return;
        }

        component.set('v.tempRating', 0);
    }

});