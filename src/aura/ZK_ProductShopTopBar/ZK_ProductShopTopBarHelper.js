({
    fetchCart: function (component, event, helper) {
        const action = component.get('c.getProductsCart');
        action.setCallback(this, function (res) {

            const state = res.getState();

            if (state === 'SUCCESS') {
                const products = res.getReturnValue();
                component.set('v.productsInCart', products);

                const productCart = component.find('productCart');
                productCart.recalculateTotalPrice();

                let cartSize = 0;
                for (let i in products) {
                    const product = products[i];
                    cartSize += product.Amount;
                }

                component.set('v.cartSize', cartSize);
            }
            else {
                alert(state);
                alert(JSON.stringify(res.getError()));
            }

        });

        $A.enqueueAction(action);
    },

    addProductToCart: function (component, product, image, unitPrice) {
        const products = component.get('v.productsInCart');
        const cartSize = component.get('v.cartSize');

        const productCart = component.find('productCart');

        let productsAmount = 0;
        let productExists = false;

        if (products.length !== 0) {

            for (let pi in products) {
                const p = products[pi];

                if (p.Id === product.Id) {
                    p.Amount++;
                    productsAmount = p.Amount;
                    productExists = true;
                    break;
                }
            }

        }

        if (!productExists) {
            product.Image = image;
            product.Amount = 1;
            productsAmount = product.Amount
            product.UnitPrice = unitPrice;
            products.push(product);
        }

        const action = component.get('c.setProductsCart');
        action.setParams({
           cart: products
        });

        action.setCallback(this, res => {

            const state = res.getState();

            if (state === 'SUCCESS') {
                component.set('v.productsInCart', products);
                component.set('v.cartSize', cartSize+1);
                productCart.recalculateTotalPrice();
                this.sendCartAddedMessage(product, productsAmount);
            }
            else {
                alert(state);
                alert(JSON.stringify(res.getError()));
            }

        });

        $A.enqueueAction(action);

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