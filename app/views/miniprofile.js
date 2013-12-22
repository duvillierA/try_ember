import TooltipBuilder from 'appkit/utils/tooltip';

var miniprofileView = Ember.View.extend({
  classNames: ['comp-miniprofile', 'animated'],
  tooltip: null,
  targetElement: function () {
    return this.get('controller.targetElement');
  }.property('controller'),
  placement: function () {
    return this.get('controller.placement');
  }.property('controller'),
  willInsertElement: function () {
    var tooltip = new TooltipBuilder();
    this.set('tooltip', tooltip);
  },
  didInsertElement: function () {
    var $miniprofile = this.$(),
      tooltip = this.get('tooltip'),
      css = tooltip.getCss(
        this.get('targetElement'),
        this.get('placement'),
        $miniprofile.width(),
        $miniprofile.height(),
        10
      );

    $miniprofile.css(css).addClass('placement-' + css.placement);
  }
});

export
default miniprofileView;
