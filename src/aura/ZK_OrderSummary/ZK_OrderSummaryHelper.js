({
    calculateTotalPrice: function (component, cart) {
        let totalPrice = 0;
        let totalPriceWithDiscounts = 0;

        for (let i = 0 ; i < cart.length ; i++) {
            totalPrice += cart[i].Amount * cart[i].UnitPrice;
            if (cart[i].UnitPriceDiscount != null) {
                totalPriceWithDiscounts += cart[i].Amount * cart[i].UnitPriceDiscount;
            }
        }

        component.set('v.totalPrice', totalPrice);
        component.set('v.totalPriceWithDiscounts', totalPriceWithDiscounts);
    }
});