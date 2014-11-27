var gv = require('./globalvoices.js');
//console.log(gv.returnCountries());
//console.log(gv.writeAllCountryStoriesToDatabase());
console.log('-------------------------------------');
//console.log(gv.fullURLfromCountry("Spain"));
//console.log('-------------------------------------');
gv.recentStoriesFromDatabase("Spain", function(result){

	console.log("finallog" + result);

});
