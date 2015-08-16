// Redirect to login if needed
Router.onBeforeAction(function() {
  if (this.ready() && !Meteor.userId()) {
    return this.redirect('/login');
  }
  this.next();
}, {except: ['login']});

Router.route('/', function() {
  this.layout('appLayout');
  this.render('newTransaction');
});
Router.route('/login', function() {
  if (this.ready() && Meteor.userId()) {
    return this.redirect('/');
  }
  this.layout('loginLayout');
  this.render('login');
});
