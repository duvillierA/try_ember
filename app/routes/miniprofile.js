var count=0;
var miniprofileRoute =  Ember.Route.extend({
  model: function(params) {
    return new Ember.RSVP.Promise(function(resolve) {
        Ember.run.later(function() {
          if(count++ % 2 === 0) {
            resolve({
              memberid: params.memberid,
              fullName: 'testFullName',
              headline: 'headline',
              avatarUrl: 'http://placehold.it/150x200'
            });
          }else {
            resolve({
              memberid: params.memberid,
              fullName: 'testFullName22222',
              headline: 'headline2222',
              avatarUrl: 'http://placehold.it/350x200'
            });
          }
        }, 600);
    });
  },
  actions: {
    loading: function(transition, originRoute) {
      // Return true to bubble this event to `FooRoute` or `ApplicationRoute`.
      if (originRoute.routeName === 'miniprofile') {
        this.controllerFor('miniprofile').set('isLoading', true);
      }
      return;
    }
  },
  afterModel: function(miniprofile) {
    this.controllerFor('miniprofile').set('isLoading', false);
  },
  serialize: function(model) {
    //We need to explain to the router how to translate the model into a URL, for that wee need to override serialize.
    return model;
  }
});

export default miniprofileRoute;
