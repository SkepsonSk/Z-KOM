public with sharing class ZK_LeadTriggerHandler extends TriggerHandler {

    public void afterUpdate(SObject old_so, SObject so) {

        if (so.get('Status') == 'Marketing_Materials') {

            Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();

            message.setTargetObjectId(so.Id);
            message.setSenderDisplayName('Z-Kom Marketing Department');
            message.setReplyTo('jakub.zelmanowicz@britenet.com.pl');
            message.setUseSignature(false);
            message.setBccSender(false);
            message.setSaveAsActivity(false);

            EmailTemplate template = [SELECT Id,Subject,Description,HtmlValue,DeveloperName FROM EmailTemplate WHERE DeveloperName LIKE 'Marketing_Materials%'];

            message.setTemplateId(template.Id);

            String email = (String) so.get('Email');
            message.toAddresses = new String[] { email };

            Messaging.SingleEmailMessage[] messages = new List<Messaging.SingleEmailMessage> { message };
            Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);
        }

    }

}