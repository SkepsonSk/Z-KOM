({
    addProductToCart: function (component, product, image, unitPrice) {
        const products = component.get('v.productsInCart');
        const cartSize = component.get('v.cartSize');

        const productCart = component.find('productCart');

        component.set('v.cartSize', cartSize+1);

        if (products.length !== 0) {

            for (let pi in products) {

                const p = products[pi];

                if (p.Id === product.Id) {
                    p.Amount++;
                    component.set('v.productsInCart', products);
                    productCart.recalculateTotalPrice();
                    this.sendCartAddedMessage(product, p.Amount);
                    return;
                }
            }

        }

        product.Image = image;
        product.Amount = 1;
        product.UnitPrice = unitPrice;
        products.push(product);

        component.set('v.productsInCart', products);
        productCart.recalculateTotalPrice();
        this.sendCartAddedMessage(product, product.Amount);
    },

    sendCartAddedMessage: function (product, amount) {
        const toastEvent = $A.get('e.force:showToast');
        toastEvent.setParams({
            title: product.Name + ' x' + amount,
            message: 'Product has been added to cart',
            type: 'success'
        });
        toastEvent.fire();
    }
});