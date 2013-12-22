var Router = Ember.Router.extend();

Router.map(function() {
  this.resource('miniprofile', { path:'miniprofile/:memberid' });
});

export default Router;
