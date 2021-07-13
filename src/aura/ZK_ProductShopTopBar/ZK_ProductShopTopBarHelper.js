({
    fetchProfilesSetting: function (component) {
        const action = component.get('c.getProfilesSetting');
        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state === 'SUCCESS') {
                component.set('v.profilesSetting', res.getReturnValue());
            }
        });

        $A.enqueueAction(action);
    },

    fetchCurrentUserProfile: function (component) {
        const action = component.get('c.getCurrentProfile');
        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state === 'SUCCESS') {
                component.set('v.userProfile', res.getReturnValue());
            }
        });

        $A.enqueueAction(action);
    },

    fetchCart: function (component, event, helper) {
        const action = component.get('c.getProductsCart');
        action.setCallback(this, function (res) {

            const state = res.getState();

            if (state === 'SUCCESS') {
                const products = res.getReturnValue();
                if (products === null) {
                    return;
                }

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

        });

        $A.enqueueAction(action);
    },

    clearCart: function(component) {
        const action = component.get('c.clearProductsCart');
        action.setCallback(this, function (res) {
            const state = res.getState();

            if (state === 'SUCCESS') {
                component.set('v.productsInCart', []);
                component.set('v.cartSize', 0);
            }
        });
        $A.enqueueAction(action);
    },

    addProductToCart: function (component, product, image, unitPrice, unitPriceDiscount) {
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
            product.UnitPriceDiscount = unitPriceDiscount;
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
                this.sendErrorMessage();
                console.log(state);
                console.log(res.getError());
            }

        });

        $A.enqueueAction(action);

    },

    sendCartAddedMessage: function (product, amount) {
        const messageLabel = $A.get("$Label.c.ZK_Message_Added_To_Cart");

        const toastEvent = $A.get('e.force:showToast');
        toastEvent.setParams({
            title: product.Name + ' x' + amount,
            message: messageLabel,
            type: 'success'
        });
        toastEvent.fire();
    },

    sendErrorMessage: function () {
        const titleLabel = $A.get("$Label.c.ZK_Message_Title_Error");
        const messageLabel = $A.get("$Label.c.ZK_Message_Contact_Admin");

        const toastEvent = $A.get('e.force:showToast');
        toastEvent.setParams({
            title: titleLabel,
            message: messageLabel,
            type: 'error'
        });
        toastEvent.fire();
    }
});