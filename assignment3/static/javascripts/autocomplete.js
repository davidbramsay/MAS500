var gv = require('./globalvoices.js');

$('#autocomplete').autocomplete({
  lookup: gv.returnCountries,
  onSelect: function (suggestion) {
    var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
    $('#outputcontent').html(thehtml);
  }
});