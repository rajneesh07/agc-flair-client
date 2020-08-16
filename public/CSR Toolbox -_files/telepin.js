djQ(document).ready(function($) {
    "use strict";
    var accountList = $("#account_list").attr('data-regions');

    if (accountList) {
        var regionsData = JSON.parse(accountList);
    }

    $('#account_list').on('change', function() {
        var accountType = $(this).val(),
            regionsValues = regionsData[accountType],
            selectOptions = [];
        for (var foo in regionsValues) {
            var option = '<option value="' + regionsValues[foo][0] + '">' + regionsValues[foo][1]  + " (" +
                regionsValues[foo][2] + ")" + '</option>';
            selectOptions.push(option);
        }
        $("#regions").html(selectOptions);
    });
});
