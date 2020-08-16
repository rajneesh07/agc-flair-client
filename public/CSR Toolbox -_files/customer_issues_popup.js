(function($) {
    $(document).ready(function() {
        var issues = customer_issues;
        if (issues.length) {
            $( "#customerissue" ).dialog({
                height: 150, width: 350, modal: true, draggable: false, resizable: false,
                open: function() {
                    $(this).html('<p>' + issues.join("<p>"));
                    // Add custom class to dialog overlay to allow customisation
                    $('.ui-widget-overlay').addClass('customerissue-dialog-overlay');
                },
                close: function() {
                    $('.ui-widget-overlay').removeClass('customerissue-dialog-overlay');
                },
                buttons : {
                    "OK": {
                        text: "OK",
                        "class": "customerissue-ok-button",
                        click: function() {
                            $(this).dialog("close");
                        }
                    },
                },
                dialogClass: "no-close customerissue-dialog"
            });
        }
    });
})(grp.jQuery);
