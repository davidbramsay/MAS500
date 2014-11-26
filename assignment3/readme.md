This is my attempt to re-make the 'Global Voices' app in Node.  I basically rewrote the entire application from scratch.

This is what I did:

1) Re-wrote the python script which manages the RSS feed using node, and tested it with test.js

2) Re-routed the requests through a node server backend, using Express and the Jade templating engine

3) Changed the file structure to work with Node and Express

4) used jquery to handle autocomplete with highlighting, and to accept the form input on the 'enter' keystroke

5) changed the behavior using javascript so that the form submission, instead of a POST or GET request, simply added the country name as part of the url and requests that new url.  I then rewrote the backend to analyze the url request and serve data of the corresponding country. 

6) restyled the css in a very basic way.


This is an interesting application because a JSON file exists in the backend with countries and associated URLs.  When the user requests the homepage, we want to take only part of the JSON file and render it to the client for the autocomplete box data. This requires the JSON file to be parsed logically, passed through the express router to the template, and then finally handed to the javascript file where the autocomplete routine is located.  This was an interesting lesson for me, because it seems so indirect (but there is no way to partially render or otherwise easily pass *part* of the JSON file on the server side before pushing it to the client).  

When the client chooses a country name from the list, the server is then notified, and we go back into that same JSON database to find a matching url extension, process it by adding the domain name prefix, pull data off the internet using the completed URL, and write it into a JSON object.  This JSON object is then routed through Express to the template and rendered, all on the server side.

This was a really good exercise to understand the handling/routing of data files on the server, and how to structure these applications efficiently for server/client exchange.  



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

