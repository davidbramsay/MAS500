This is an updated version of the Global Voices app that I rewrote in Node.js last week.

Instead of accessing and returning values from the internet when a request is processed, the request is instead retrieved from an sqlite3 database.  (ie, the function in app.js which routes calls the appropriate 'recentStoriesFromDatabase' function found in globalvoices.js).  There are additionally two methods to access all of the global voices rss feeds and store them in a database, called 'Stories', with the structure:

primary key | country | title | author | link | contentsnippet | date

The first method takes an array of country names, looks up their urls, and populates the database with the 3 most recent stories.  If no database exists, the method will create one.  The second method passes an array of all countries to the first method, to quickly scrape the three most recent stories all at once.


##To use
clone or unzip, and then use
```
npm start 
```
or 
```
node ./bin/www
```

it will appear on localhost:3000

If you'd like to update the database with new stories, you'll need to call 

```
node test.js
```

