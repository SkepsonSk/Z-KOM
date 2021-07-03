public with sharing class ZK_ProductCartController {

    @AuraEnabled
    public static Boolean setProductsCart(List<Object> cart) {
        Cache.SessionPartition sessionPart = Cache.Session.getPartition('local.ZKOM');
        if (sessionPart == null){
            return false;
        }

        sessionPart.remove('cart');
        sessionPart.put('cart', cart);

        return true;
    }

    @AuraEnabled
    public static List<Object> getProductsCart() {
        Cache.SessionPartition sessionPart = Cache.Session.getPartition('local.ZKOM');
        if (sessionPart == null){
            return null;
        }

        return (List<Object>) sessionPart.get('cart');
    }

}