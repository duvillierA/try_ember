import miniprofileModel from 'appkit/models/miniprofile';

var miniprofileRoute = Ember.Route.extend({
  model: function (params) {
    return miniprofileModel.find(params.memberid);
  },
  renderTemplate: function () {
    this.render('miniprofile');
  },
  actions: {
    loading: function (transition, originRoute) {
      // Return true to bubble this event to `FooRoute` or `ApplicationRoute`.
      if (originRoute.routeName === 'miniprofile') {
        this.controllerFor('miniprofile').set('isLoading', true);
      }
      return;
    }
  },
  afterModel: function () {
    this.controllerFor('miniprofile').set('isLoading', false);
  },
  serialize: function (model) {
    //We need to explain to the router how to translate the model into a URL, for that wee need to override serialize.
    return model;
  }
});

export
default miniprofileRoute;
