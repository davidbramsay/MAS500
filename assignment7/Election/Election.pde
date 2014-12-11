/**
 * Example that loads up election data and draws something with it.
 
 * make a circle centered at long,lat of state, with radius (minrad to maxrad) scaled on tot#votes,
 * and color of red or blue depending on who won
 */

// window size (it's a square)
final int WIN_X = 600;
final int WIN_Y = 400;
final int MINRAD = 10;
final int MAXRAD = 50;

final float MINVOTES = 200000;
final float MAXVOTES = 10300000;
final float MINLAT = 25;
final float MAXLAT = 54;
final float MINLON = -125;
final float MAXLON = -65;
// loads and holds the data in the election results CSV
ElectionData data;
StateLocation locData;
// holds a list of state postal codes
String[] statePostalCodes;
// what index in the statePostalCodes array are we current showing
int currentStateIndex = 0;

/**
 * This is called once at the start to initialize things
 **/
void setup() {
  // create the main window
  size(WIN_X, WIN_Y);
  // load in the election results data
  data = new ElectionData(loadStrings("data/2012_US_election_state.csv"));
  statePostalCodes = data.getAllStatePostalCodes();
  locData = new StateLocation(loadStrings("data/state_latlon.csv"));
  print("Loaded data for "+data.getStateCount()+" states\n");
  print("Loaded location data for "+locData.getStateCount()+" states");
}

/**
 * This is called repeatedly
 */
void draw() {
  
  String currentPostalCode = statePostalCodes[ currentStateIndex ];
  StateData state = data.getState(currentPostalCode);
  StateLatLon stateLoc = locData.getState(currentPostalCode);
 
  stroke(255, 50);
  if (state.votesForRomney > state.votesForObama){
    
    fill(Math.round(255 * (state.pctForRomney/100)),0,0);
  }else {
    fill(0,0,Math.round(255 * (state.pctForObama/100)));
  }
  
  int x = (int)(((stateLoc.longitude - MINLON)/(MAXLON-MINLON)) * WIN_X);
  int y = (int)(WIN_Y - ((stateLoc.latitude - MINLAT)/(MAXLAT-MINLAT)) * WIN_Y);
  int radius = (int)((((state.votesForRomney + state.votesForObama - MINVOTES)/(MAXVOTES-MINVOTES))*(MAXRAD-MINRAD) + MINRAD));
  
  ellipse(x,y,radius,radius);
  
  // update which state we're showing
  currentStateIndex = (currentStateIndex+1) % statePostalCodes.length;
}

