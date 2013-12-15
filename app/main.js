import miniprofileController from 'appkit/controllers/miniprofile';

var Main = (function($){
  $('a').on('mouseover',function(e){
    e.preventDefault();
    Appkit.__container__.lookup('controller:miniprofile').send('showMiniprofile',{
      memberid: 'memberId',
      placement : 'sw-alt',
      targetElement: $(this)
    });
  }).on('mouseout', function(){
      Appkit.__container__.lookup('controller:miniprofile').send('hideMiniprofile');
  });
})(jQuery);

export default Main;
