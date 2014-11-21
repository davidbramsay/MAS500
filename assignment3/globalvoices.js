var data = require('./globalvoices-countrypaths.json');
var request = require('request');
var http = require('http');

var globalvoices = {

	returnAllData: function (){
		return JSON.stringify(data);
	},

	returnCountries: function (){
		var countries = [];
		for (var key in data){
			countries.push(key);
		}
		return countries;
	},

	rssURLfromCountry: function (country){
		return data[country];
	},

	fullURLfromCountry: function (country){
		return "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=3&q=http%3A//globalvoicesonline.org" + this.rssURLfromCountry(country).toString("utf8") + "feed";
	},

	recentStoriesFrom: function (country, callback){

		http.get(this.fullURLfromCountry(country), function(res) {

			var htmlString = '';

    		res.on('data', function(chunk) {
        		htmlString += chunk;
    		});

    		res.on('end', function() {
        		var stories = [];

        		htmlString = JSON.parse(htmlString);

        		for (details in htmlString['responseData']['feed']['entries']){
        			var temp = htmlString['responseData']['feed']['entries'][details];
        			stories.push({'title':temp['title'],'link':temp['link'],'author':temp['author'],'contentSnippet':temp['contentSnippet']});
        		}

        		callback(stories);
    		});
		});	
	},

};

module.exports = globalvoices;