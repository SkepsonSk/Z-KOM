({
    doInit: function (component, event, helper) {
        const product = component.get('v.productData');

        helper.determineSelected(component, product);
        helper.prepareImage(component, product);
    },

    onSelect: function (component, event, helper) {
        const selected = component.get('v.selected');
        helper.handleSelected(component, !selected);
    }
});