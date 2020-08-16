(function($) {
  $(document).ready(function (e) {
    var data_table = $("#invoices-table");
    var invoice_url = data_table.data('invoice-url');
    var invoice_details_url = data_table.data('invoice-details-url');

    function openPdfEvent(event) {
      event.preventDefault();
      var elem = $(event.target);
      var url = getUrl(invoice_url, elem);
      window.open(url);
    }

    function getUrl(base, elem) {
      var call_itemization = elem.attr('data-call-itemization');
      var params = {
        inv_date: elem.attr('data-date'),
        inv_number: elem.attr('data-invoice-id'),
        is_company: elem.attr('data-is-company'),
      };
      if (call_itemization !== undefined) {
        params['msisdn'] = elem.attr('data-msisdn');
        params['call_itemization'] = 1;
      }
      return base + '?' + $.param(params);
    }

    function getInvoiceItemization(invoice_id, customer_id, container) {
      var params = {
        invoice_id: invoice_id,
        customer_id: customer_id
      };
      var url = invoice_details_url + '?' + $.param(params);
      container.load(
        url,
        function () {
          container.effect('highlight');
        });
    }

    function triggerPdfEvent(elem) {
      // Disable further clicks until PDF has been generated.
      elem.on('click', false);
      var invoice_id = elem.data('invoice-id');
      var spinner_id = invoice_id + '_spinner';

      // Add spinner.
      elem.prepend('<span id="' + spinner_id + '" class="icon-small-spinner-container"></span>');

      // Trigger PDF generation.
      $.ajax({
        url: elem.attr('href'),
        method: "GET",
        success: function () {
          var url = getUrl(invoice_url, elem);
          elem.attr('href', url);
          $('#' + spinner_id).remove();
          elem.on("click", openPdfEvent);
          window.open(url);
          return false;
        }
      });
    }

    function toggle(opener) {
      var content = opener.next(".invoice-details");
      var expander = $("i.expand i", opener);
      if(content.data('open') == 1){
        content.hide();
        content.data('open', 0);
        expander.addClass("icon-caret-right").removeClass("icon-caret-down");
      } else {
        var external_id = opener.data('external-id');
        var customer_id = opener.data('customer-id');
        content.show();
        content.data('open', 1);
        expander.addClass("icon-caret-down").removeClass("icon-caret-right");
        getInvoiceItemization(external_id, customer_id, content);
      }
    }

    $(document).on('click', '#invoices-table .opener', function() {
      var opener = $(this);
      toggle(opener);
      opener.toggleClass('hover-magic')
        .next().toggleClass('hover-magic');
    });

    $(document).on("click", "#invoices-table a.invoice-trigger", function (event) {
      event.preventDefault();
      event.stopPropagation();
      triggerPdfEvent($(this));
    });

    $(document).on('click', '.pagination .step-links .to_page', function(e){
      e.preventDefault();
      var link = $(this);
      var invoice_pagination = $(".invoice-pagination");
      var invoice_id = invoice_pagination.data('invoice-id');
      var customer_id = invoice_pagination.data('customer-id');
      var requested_page = link.data('number');
      var params = {
        invoice_id: invoice_id,
        customer_id: customer_id,
        requested_page: requested_page
      };
      var url = link.attr('href') + '&' + $.param(params);

      var container = link.closest('.invoice-details');
      container.load(
        url,
        function (data) {
          $(this).effect('highlight');
        }
      );
    });
  })

})(django.jQuery);
