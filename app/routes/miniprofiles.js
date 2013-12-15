export default Ember.Route.extend({
  model: function() {
    return ['profile1', 'profile2', 'profile3'];
  },
  beforeModel: function() {},
  afterModel: function(miniprofiles) {}
});
