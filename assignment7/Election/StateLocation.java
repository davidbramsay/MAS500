import java.util.*;

/**
 * Encapsulates data about voting across the nation, on a per state basis
 */
public class StateLocation {

  // map from state 2-letter postal code to StateData object
  public HashMap<String,StateLatLon> stateLookup;
  
  public StateLocation(String[] lines) {
    this.stateLookup = new HashMap<String,StateLatLon>();
    this.parseFromCsvLines(lines);
  }

  private void parseFromCsvLines(String[] lines) {
    // skip first line, it has column headers
    for(int i=1; i<lines.length; i++) {
      // create the state record
      StateLatLon state = StateLatLon.FromCsvLine(lines[i]);
      this.stateLookup.put(state.postalCode, state);
    }
  }
  
  public String[] getAllStatePostalCodes(){
    return this.stateLookup.keySet().toArray(new String[0]);
  }
  
  public StateLatLon[] getAllStates(){
    return this.stateLookup.values().toArray(new StateLatLon[0]);
  }
  
  public StateLatLon getState(String postalCode){
   return this.stateLookup.get(postalCode);
  }
  
  public int getStateCount(){
    return this.stateLookup.size();
  }

}
