// Configure to use twilio.
Accounts.sms.configure({
  twilio: {
    from: Meteor.settings.TWILIO.FROM,
    sid: Meteor.settings.TWILIO.SID,
    token: Meteor.settings.TWILIO.TOKEN
  }
});
