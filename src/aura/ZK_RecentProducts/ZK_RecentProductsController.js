({
    doInit: function (component, event, helper) {
        helper.fetchRecentProducts(component);
        helper.fetchCurrency(component);
    }
});