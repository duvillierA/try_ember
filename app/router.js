var Router = Ember.Router.extend({
  //location:'none' disable history navigation
});

Router.map(function() {
  this.route('component-test');
  this.route('helper-test');
  this.resource('miniprofiles', function() {
    this.resource('miniprofile', { path:'/:memberid' });
  });
  // this.resource('posts', function() {
  //   this.route('new');
  // });
});

export default Router;
