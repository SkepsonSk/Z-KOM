public with sharing class ZK_OrderController {

    public class OrderProduct {
        @AuraEnabled public Id Id { get; set; }
        @AuraEnabled public Integer Amount { get; set; }
    }

    public class AddressWrapper {
        @AuraEnabled public String street { get; set; }
        @AuraEnabled public String city { get; set; }
        @AuraEnabled public String state { get; set; }
        @AuraEnabled public String postalCode { get; set; }
        @AuraEnabled public String country { get; set; }
    }

    @AuraEnabled
    public static Id createOpportunity(List<OrderProduct> cart) {
        return handleOpportunityCreation(cart);
    }

    @AuraEnabled
    public static String createOrder(Id opportunityId, AddressWrapper billingAddress, AddressWrapper shippingAddress) {
        return handleOrderCreation(opportunityId, billingAddress, shippingAddress);
    }

    @AuraEnabled
    public static void close(Id opportunityId, Id orderId) {
        handleClose(opportunityId, orderId);
    }

    @AuraEnabled
    public static void updateProducts(Id opportunityId, List<OrderProduct> cart) {
        handleProductsUpdate(opportunityId, cart);
    }

    @AuraEnabled
    public static void updateContactAddress(String addressType, AddressWrapper address) {
        handleContactAddressUpdate(addressType, address);
    }

    private static Id handleOpportunityCreation(List<OrderProduct> cart) {
        String firstName = UserInfo.getFirstName();
        String lastName = UserInfo.getLastName();

        Pricebook2 pricebook2 = [SELECT Id FROM Pricebook2 WHERE IsStandard = true AND IsActive = true LIMIT 1];

        Opportunity opportunity = new Opportunity();
        opportunity.Name = firstName + ' ' + lastName;
        opportunity.StageName = 'Collecting Products';
        opportunity.CloseDate = Date.today().addDays(1);
        opportunity.Pricebook2Id = pricebook2.Id;
        insert opportunity;

        handleProductsUpdate(opportunity.Id, cart);

        return opportunity.Id;
    }

    private static String handleOrderCreation(Id opportunityId, AddressWrapper billingAddress, AddressWrapper shippingAddress) {
        Opportunity opportunity = [
                SELECT Amount FROM Opportunity
                WHERE Id=:opportunityId
                LIMIT 1
        ];

        List<OpportunityLineItem> items = [
                SELECT TotalPrice,Discount,PricebookEntryId,Quantity,UnitPrice FROM OpportunityLineItem
                WHERE OpportunityId=:opportunityId
        ];

        Account account = [
                SELECT Id FROM Account
                WHERE Name='Customers'
                LIMIT 1
        ];

        Pricebook2 pricebook2 = [SELECT Id FROM Pricebook2 WHERE IsStandard = true AND IsActive = true LIMIT 1];

        String firstName = UserInfo.getFirstName();
        String lastName = UserInfo.getLastName();
        String orderName = firstName + ' ' + lastName;

        Order order = new Order(Name = orderName);
        order.AccountId = account.Id;
        order.EffectiveDate = Date.today();
        order.Pricebook2Id = pricebook2.Id;
        order.Status = 'Order in Progress';

        order.BillingStreet = billingAddress.street;
        order.BillingCity = billingAddress.city;
        order.BillingPostalCode = billingAddress.postalCode;
        order.BillingState = billingAddress.state;
        order.BillingCountry = billingAddress.country;

        if (shippingAddress != null) {
            order.ShippingStreet = shippingAddress.street;
            order.ShippingCity = shippingAddress.city;
            order.ShippingPostalCode = shippingAddress.postalCode;
            order.ShippingState = shippingAddress.state;
            order.ShippingCountry = shippingAddress.country;
        }

        insert order;

        for (OpportunityLineItem item : items) {
            OrderItem orderItem = new OrderItem();
            orderItem.Quantity = item.Quantity;
            orderItem.OrderId = order.Id;
            orderItem.PricebookEntryId = item.PricebookEntryId;

            if (item.Discount != null && item.Discount != 0) {
                orderItem.UnitPrice = item.UnitPrice - item.UnitPrice*(item.Discount/100);
            }
            else {
                orderItem.UnitPrice = item.UnitPrice;
            }

            insert orderItem;
        }

        return order.Id;
    }

    private static void handleClose(Id opportunityId, Id orderId) {
        Opportunity opportunity = [
                SELECT Id FROM Opportunity
                WHERE Id=:opportunityId
        ];

        opportunity.StageName = 'Closed';
        update opportunity;

        Order order = [
                SELECT Id FROM Order
                WHERE Id=:orderId
        ];

        order.Status = 'Closed';
        update order;
    }

    private static void handleProductsUpdate(Id opportunityId, List<OrderProduct> cart) {
        List<OpportunityLineItem> oldItems = [
                SELECT Id FROM OpportunityLineItem
                WHERE OpportunityId = :opportunityId
        ];
        delete oldItems;

        List<Id> productIds = new List<Id>();
        for (OrderProduct item : cart) {
            productIds.add(item.Id);
        }

        Pricebook2 pricebook2 = [SELECT Id FROM Pricebook2 WHERE IsStandard = true AND IsActive = true LIMIT 1];
        List<PricebookEntry> products = [
                SELECT Product2.Id, UnitPrice
                FROM PricebookEntry
                WHERE Product2.Id IN :productIds
                AND Pricebook2.IsStandard = true
                AND Pricebook2.IsActive = true
        ];

        List<PricebookEntry> discounts = [
                SELECT Product2Id,Pricebook2.Id,UnitPrice,Pricebook2.Discount_Percent__c,Pricebook2.All_Products__c
                FROM PricebookEntry
                WHERE Pricebook2.IsStandard = false AND Pricebook2.IsActive = true
        ];
        List<Pricebook2> allProductsDiscounts = [
                SELECT Discount_Percent__c FROM Pricebook2
                WHERE IsActive = true
                AND IsStandard = false
                AND All_Products__c = true
                LIMIT 1
        ];

        for (OrderProduct cartItem : cart) {

            for (PricebookEntry pricebookEntry : products) {

                Decimal discount = 0;
                if (!allProductsDiscounts.isEmpty()) {
                    discount = allProductsDiscounts[0].Discount_Percent__c;
                }
                else {
                    for (PricebookEntry discountEntry : discounts) {
                        if (discountEntry.Product2Id == cartItem.Id) {
                            discount = discountEntry.Pricebook2.Discount_Percent__c;
                            break;
                        }
                    }
                }

                if (pricebookEntry.Product2Id == cartItem.Id) {
                    OpportunityLineItem item = new OpportunityLineItem();
                    item.OpportunityId = opportunityId;
                    item.Product2Id = cartItem.Id;
                    item.UnitPrice = pricebookEntry.UnitPrice;
                    item.Quantity = cartItem.Amount;

                    if (discount > 0) {
                        item.Discount = discount;
                    }

                    insert item;
                    break;
                }
            }

        }

    }

    private static void handleContactAddressUpdate(String addressType, AddressWrapper address){
        String email = UserInfo.getUserEmail();
        Contact contact = [
                SELECT Id FROM Contact
                WHERE Email=:email
                LIMIT 1
        ];

        if (addressType == 'orderAddress') {
            contact.MailingStreet = address.street;
            contact.MailingCity = address.city;
            contact.MailingState = address.state;
            contact.MailingPostalCode = address.postalCode;
            contact.MailingCountry = address.country;
        }
        else {
            contact.OtherStreet = address.street;
            contact.OtherCity = address.city;
            contact.OtherState = address.state;
            contact.OtherPostalCode = address.postalCode;
            contact.OtherCountry = address.country;
        }

        update contact;
    }

}