var Router = Ember.Router.extend({
  //location:'none' disable history navigation
});

Router.map(function() {
  this.route('component-test');
  this.route('helper-test');
  this.route('miniprofile', { path:'miniprofile/:memberid' });
});

export default Router;
