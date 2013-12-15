export default Ember.ObjectController.extend({
  isLoading: false,
  placementElement: 'nw-alt',
  targetElement: null,
  loading : function() {
    this.toggleProperty('isLoading');
  },
  id: function() {
    return this.get('model.memberid');
  }.property('model.memberid'),
  actions : {
    showMiniprofile : function(params){
      this.transitionToRoute('miniprofile', params.memberid);
      this.set('targetElement', params.targetElement);
      this.set('placementElement', params.placementElement);
    },
    hideMiniprofile : function(memberId){
      this.transitionToRoute('index');
    }
  }
});
