export default Ember.ObjectController.extend({
  isLoading: false,
  visible: true,
  placement: 'nw-alt',
  targetElement: null,
  isVisible: function() {
    this.set('visible', !this.get('isLoading'));
  }.observes('isLoading'),
  actions : {
    showMiniprofile : function(params){
      // todo find miniprofile cached
      var
        placement = params.hasOwnProperty('placement') ? params.placement : null,
        targetElement = params.hasOwnProperty('targetElement') ? params.targetElement : null,
        memberid = params.hasOwnProperty('memberid') ? params.memberid : null
      ;
      if(placement) this.set('placement', placement);
      if(targetElement && memberid) {
        this.set('targetElement', targetElement);
        this.transitionToRoute('miniprofile', memberid);
      }
    },
    hideMiniprofile : function(memberId){
      this.set('visible', false);
      this.transitionToRoute('index');
    }
  }
});
