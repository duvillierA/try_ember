import miniprofileController from 'appkit/controllers/miniprofile';

var Main = (function($){
  var miniprofileController = Appkit.__container__.lookup('controller:miniprofile');
  $('#content').on('mouseover', '.miniprofileTarget', function(){
    miniprofileController.send('showMiniprofile',{
      memberid: 'memberId',
      placement : 'nw-alt',
      targetElement: $(this)
    });
  }).on('mouseout', '.miniprofileTarget', function(){
    miniprofileController.send('hideMiniprofile');
  });
})(jQuery);

export default Main;
