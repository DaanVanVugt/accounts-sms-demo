Meteor.transactions = new Mongo.Collection('transactions');
Meteor.transactions.attachSchema(new SimpleSchema({
  title: {
    type: String,
    max: 100,
  },
  date: {
    type: Date,
    autoValue: function(doc) {
      if (this.isInsert) {
        return new Date();
      }
    },
  },
  amount: {
    type: Money, // TODO check > 0
  },
  paidBy: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  participants: {
    type: [Object],
    minCount: 1,
  },
  'participants.$.userId': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  'participants.$.share': {
    type: Number,
    min: 0,
  },
  'participants.$.fixed': {
    type: Money, // TODO check >= 0 and currency same
  },
}));
