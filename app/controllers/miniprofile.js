export default Ember.ObjectController.extend({
  isLoading: false,
  placement: 'nw-alt',
  targetElement: null,
  actions : {
    showMiniprofile : function(params){
      // todo find miniprofile cached
      if(params.memberid) {
        this.transitionToRoute('miniprofile', params.memberid);
      }
      if(params.targetElement) {
        this.set('targetElement', params.targetElement);
      }
      if(params.placement) {
       this.set('placement', params.placement);
      }
    },
    hideMiniprofile : function(memberId){
      this.transitionToRoute('index');
    }
  }
});
