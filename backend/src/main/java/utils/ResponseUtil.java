package utils;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import java.util.Map;
// Above are the import statements for this class.

/**
 * This is an Util that all developers can use in order to take an input of Map of String,Object
 * (the Object being from any data source a developer may/can have), and make it "submittable" Json
 * for the API (and its services/functionality).
 *
 * @param response of type Map of String,Object; representing the response that we want to make
 *     "submittable" for the API
 */
public record ResponseUtil(Map<String, Object> response) {

  /**
   * This (public) method is responsible for serializing. Essentially, it is the link between Json
   * and the API. Notice that it returns a String to be displayed on the web page.
   *
   * @return a String representing the "serialized" version of the Json (as a string) so that the
   *     API can use it
   */
  public String serialize() {
    // Here we are creating a local moshi variable.
    Moshi moshi = new Moshi.Builder().build();
    JsonAdapter<Map> jsonAdapter = moshi.adapter(Map.class);
    // Returning the string "serialization" essentially (the acceptable format for the API).
    return jsonAdapter.toJson(this.response);
  }
}
