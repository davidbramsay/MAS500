var gv = require('./globalvoices.js');

console.log(gv.returnCountries());
console.log('-------------------------------------');
console.log(gv.fullURLfromCountry("Spain"));
console.log('-------------------------------------');
gv.recentStoriesFrom("Spain", function(result){

	console.log(result);

});
