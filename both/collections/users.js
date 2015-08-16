if (Meteor.isClient) {
  Meteor.users.attachSchema(new SimpleSchema({
    number: {
      type: String, // TODO use emgee phone lib
    },
    profile: {
      type: Object,
    },
    'profile.name': {
      type: String,
    },
  }));
}
