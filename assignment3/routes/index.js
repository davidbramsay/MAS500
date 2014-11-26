var express = require('express');
var router = express.Router();
var gv = require('../globalvoices.js');

/* GET home page. */
router.get('/', function(req, res) {
  console.log('GET');
  res.render('index.jade', { countries: gv.returnCountriesJSON() });
});

router.get('/:countryId', function(req, res) {
	console.log('country is ' + req.param('countryId'))

	gv.recentStoriesFrom(req.param('countryId'), function(result){

	res.render('stories.jade', {stories: result, titleVar : req.param('countryId'), countries: gv.returnCountriesJSON()});

});

});

module.exports = router;
