This is my attempt to re-make the Global Voices app in Node.  I think I bit off 
a little bit more than I could chew on this one and it isn't working
fully yet, but I'm going to keep at it until I complete it.  (I'm an absolute
beginner with all of this but I'm learning a lot).  Here's what I have working/done so far:

1) Re-wrote the python script which manages the RSS feed using node, and tested it with test.js
2) Re-routed the requests through a node server backend, which is using ejs to render the html and to allow data to be passed to the template
3) Fixed/hooked up file structure to work with Node

All of this took me a really long time (as I haven't used python or node much before this), and I naively assumed that
the 'front-end' stuff would magically work if I just hooked up the routing and the node backend, which is doesn't.  I've been
looking into jquery to do the autocomplete (which I don't really understand how that is handled), and content handling within the template
(which I also haven't figured out how it's working).  It natively is recognizing images and able to pull them in, but nothing is styled and 
none of the javascript is functioning. I basically need to re-write the front end using a different templating library, which is what I plan 
to do.  I also might try to add twitter feeds, just for an extra something.  This skill set is important to me so it's worth taking the 
extra time.




