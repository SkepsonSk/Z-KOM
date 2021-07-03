({
    onRate: function (component, event, helper) {
        const rate = event.target.id;
        helper.setRating(component, rate, false);
    },

    setTempRate: function(component, event, helper) {
        const rate = event.target.id;
        helper.setRating(component, rate, true);
    },

    resetTempRate: function(component, event, helper) {
        helper.setRating(component, 0, true);
    }

});