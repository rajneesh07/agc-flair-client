function setIframe(url, dont_clear) {
  if(!dont_clear){
    django.jQuery('#grp-content').empty();
  }
  django.jQuery('<iframe id="external_tools_iframe" name="external_tools_iframe" width="100%" class="full_window">').appendTo('#grp-content');
  django.jQuery("#external_tools_iframe").addClass('loader_background');
  django.jQuery("#external_tools_iframe").attr("src", url);
  // hide controls
  django.jQuery("#link_list").hide();
  django.jQuery('.grp-module').hide();
  django.jQuery('#grp-content-title').hide();
  django.jQuery('#grp-content').css({
    paddingBottom: 0
  });
  django.jQuery("#external_tools_iframe").removeClass('loader_background');
  window.onresize = resizeIframe;
  // set iframe size
  resizeIframe();
}

function resizeIframe() {
  var iframe = document.getElementById('external_tools_iframe');
  if (iframe) {
    var height = document.documentElement.clientHeight;
    height -= iframe.offsetTop;
    height -= 20; /* whatever you set your body bottom margin/padding to be */
    iframe.style.height = (height) +"px";
  }
}

function activateTab(selector) {
  django.jQuery('.tabs li').removeClass('selected');
  django.jQuery(selector).addClass('selected');
}