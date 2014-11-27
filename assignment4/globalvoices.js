var data = require('./globalvoices-countrypaths.json');
var request = require('request');
var http = require('http');
var strftime = require('strftime');
var async = require('async');

var sqlite3 = require('sqlite3').verbose();
var fs = require("fs");
var file = "test.db";

exists = fs.existsSync(file);

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

	returnCountriesJSON: function (){
		var countries = [];
		for (var key in data){
			countries.push({value:key,label:key});
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

        		try{

	        		for (details in htmlString['responseData']['feed']['entries']){
	        			var temp = htmlString['responseData']['feed']['entries'][details];
	        			stories.push({'title':temp['title'],'link':temp['link'],'author':temp['author'],'contentSnippet':temp['contentSnippet']});
	        		}
        		}
        		catch (e) {console.log("country feed failed:" + country);}

        		callback(stories);
    		});
		});	
	},


	writeCountryStoriesToDatabase: function(countries){
		
		if(!exists) {
			console.log("Creating DB file.");
  			fs.openSync(file, "w");
		}

		var db = new sqlite3.Database(file);

		var gv = this;
			
		db.serialize(function() {

	  		if(!exists) {
	    		db.run("CREATE TABLE Stories ( pKey INTEGER PRIMARY KEY, country VARCHAR(30), title VARCHAR(200), author VARCHAR(30), date DATETIME, link VARCHAR(50), content VARCHAR(500) );");
	  		}
	  
	  		db.run("BEGIN TRANSACTION");
	        
	        stmt = db.prepare("INSERT INTO Stories(country, title, author, date, link, content) VALUES (?,?,?,?,?,?)");
	     	
	     });

        async.forEach(countries, function(country, callback){
			
			gv.recentStoriesFrom(country, function(result){
				
				db.serialize(function(){
					
					for (index in result) {
	    				stmt.run(country, result[index]["title"], result[index]["author"], strftime("%s","now"), result[index]["link"], result[index]["contentSnippet"]);
	  				}
  				
  					callback();
  				
  				});
  			});

	  		}, function(err){
	  		
	  		db.serialize(function(){
		  		
		  		stmt.finalize();
		  		
		  		db.run("END");

		  		db.each("SELECT * FROM Stories", function(err, row) {
		    			console.log(row);
				
				});
		  	
		  	});

		  	db.close();

  		});
	  			
		
	},

	writeAllCountryStoriesToDatabase: function() {

		this.writeCountryStoriesToDatabase(this.returnCountries());
		
	},

	recentStoriesFromDatabase: function(country, callback) {

		var db = new sqlite3.Database(file);
		var stories = [];
		
		
		db.serialize(function(){
		
		db.each("SELECT * FROM Stories WHERE country = '" + country + "' LIMIT 3", function(err, row) {	
			stories.push({'title':row.title,'link':row.link,'author':row.author,'contentSnippet':row.content});
	    	
	    }, function(err){
	    	
	    	callback(stories);

		});
		});
		db.close();
	}

};

module.exports = globalvoices;
