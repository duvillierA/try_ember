import TooltipBuilder from 'appkit/utils/tooltip';

var miniprofileView =  Ember.View.extend({
  classNames: ['comp-miniprofile'],
  didInsertElement: function() {
    var
      $miniprofile = this.$(),
      $targetElement = this.get('controller.targetElement'),
      placementElement = this.get('controller.placementElement'),
      tooltip = new TooltipBuilder($(window)),
      css= tooltip.getCss($targetElement, placementElement, $miniprofile.width(), $miniprofile.height(), 0)
    ;
    $miniprofile.css(css).addClass('placement-' + placementElement);
  }
});

export default miniprofileView;
