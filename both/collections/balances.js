Meteor.balances = new Mongo.Collection('balances');
Meteor.balances.attachSchema(new SimpleSchema({
  user_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  friend_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true, // Also allow adding a friend by contact details (e.g. phone)
  },
  phone: {
    type: String, // TODO add phone validation regex and normalization stuff
  },
  balance: {
    type: Money,
    optional: true,
  },
  priorityPoints: { // Used to determine the stacking of contacts
    // Higher numbers means this person will be shown higher in the search results
    // Point values: 10 for existing balance between the users
    // 5 per transaction in the last week
    type: Number,
    min: 0,
    defaultValue: 1,
  },
}));
