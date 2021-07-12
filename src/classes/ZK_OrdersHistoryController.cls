public with sharing class ZK_OrdersHistoryController {

    public class OrderHistoryPosition {
        @AuraEnabled public Order order { get; set; }
        @AuraEnabled public List<ProductData> items { get; set; }
    }

    public class ProductData {
        @AuraEnabled public OrderItem item { get; set; }
        @AuraEnabled public List<String> images { get; set; }
    }

    @AuraEnabled
    public static List<OrderHistoryPosition> getOrdersHistory() {
        String userId = UserInfo.getUserId();

        List<Order> orders = [
                SELECT EffectiveDate,Status,TotalAmount,
                       (SELECT Product2.Id,Quantity,Product2.Name,UnitPrice,Product2.Display_Image__c FROM OrderItems)
                FROM Order
                WHERE OwnerId = :userId
                ORDER BY EffectiveDate DESC
        ];

        List<ContentDocumentLink> links = getProductsImages(orders);

        List<OrderHistoryPosition> orderHistory = new List<ZK_OrdersHistoryController.OrderHistoryPosition>();
        for (Order order : orders) {
            OrderHistoryPosition pos = new OrderHistoryPosition();
            pos.order = order;

            List<ProductData> products = new List<ZK_OrdersHistoryController.ProductData>();
            for (OrderItem orderItem : order.OrderItems) {
                ProductData productData = new ProductData();
                productData.item = orderItem;
                productData.images = getProductImagesIds(links, orderItem.Product2.Id);
                products.add(productData);
            }

            pos.items = products;

            orderHistory.add(pos);
        }

        return orderHistory;
    }

    private static List<ContentDocumentLink> getProductsImages(List<Order> orders) {
        Set<Id> productIds = new Set<Id>();
        for (Order order : orders) {
            for (OrderItem orderItem : order.OrderItems) {

                Id id = orderItem.Product2.Id;
                if (!productIds.contains(id)){
                    productIds.add(id);
                }
            }
        }

        return [
                SELECT ContentDocumentId,LinkedEntityId
                FROM ContentDocumentLink
                WHERE LinkedEntityId IN :productIds
        ];
    }

    private static List<String> getProductImagesIds(List<ContentDocumentLink> links, Id productId) {
        List<String> ids = new List<String>();
        for (ContentDocumentLink link : links) {
            if (link.LinkedEntityId == productId) {
                ids.add(link.ContentDocumentId);
            }
        }
        return ids;
    }

}