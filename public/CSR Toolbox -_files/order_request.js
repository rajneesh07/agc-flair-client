var djQ = django.jQuery;


var OrderRequest = {
  slideSpeed: 100,
  sText: "<i class='icon-caret-right icon-2x'></i>",
  hText: "<i class='icon-caret-down icon-2x'></i>"
};

function init(text) {
  djQ("#orderrequests .expand").html(text);
}

djQ(document).ready(function(e) {

  init(OrderRequest.sText);

  djQ(document).on('click', '#orderrequests .opener', function() {
      var expanderSign = djQ(this).find(".expand");
      var content = djQ(this).next(".details");
      if(content.data('open') === 1){
          content.hide();
          content.data('open', 0);
          djQ(expanderSign).html(OrderRequest.sText);
          djQ(this).toggleClass('hover_magic');
          djQ(this).next().toggleClass('hover_magic');
      } else {
          content.show();
          content.data('open', 1);
          djQ(expanderSign).html(OrderRequest.hText);
          djQ(this).toggleClass('hover_magic');
          djQ(this).next().toggleClass('hover_magic');
      }
  });

  djQ(document).on('change', '#search_subscription', function(){
      var search = djQ(this);
      var path = search.attr('data-url') + '?search=' + search.val();
      var tab_id = search.attr('data-newtlet-name') + '_' + search.attr('data-tab-name');
      return load_deferred(path, tab_id);
  });
});