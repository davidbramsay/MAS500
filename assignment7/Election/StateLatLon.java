import java.util.*;

/**
 * Encapsulates data about voting in a state, on a per state basis
 */
public class StateLatLon {
  
  public String postalCode;
  public double latitude;
  public double longitude;

  // don't call this - use the factory method below
  public StateLatLon() {
  }
  
  // Factory method used to create State objects
  public static StateLatLon FromCsvLine(String oneCsvLine){
    // Columns: State Postal, lat, long
    String[] columns = oneCsvLine.split(",");
    StateLatLon state = new StateLatLon();
    state.postalCode = columns[0];
    state.latitude = Double.parseDouble(columns[1]);
    state.longitude = Double.parseDouble(columns[2]);
    return state;
  }  
}
