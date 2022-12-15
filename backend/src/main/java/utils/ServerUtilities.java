package utils;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;
// Above are our import statements for this class.

/**
 * This is the ServerUtilities class.
 */
public class ServerUtilities {

  // Static fields used for serializing and deserializing
  private static final Moshi moshi = new Moshi.Builder().build();
  private static final JsonAdapter<Map<String, Object>> jsonAdapter =
      moshi.adapter(Types.newParameterizedType(Map.class, String.class, Object.class));


  /**
   * Serializes a Map into a two-dimensional JSON array with type String
   *
   * @param map a map with String keys and Object values
   * @return a two-dimensional JSON array
   */
  public static String serialize(Map<String, Object> map) {
    return jsonAdapter.toJson(map);
  }

  /**
   * Deserializes a JSON-formatted String into a Map
   *
   * @param str a JSON-formatted String
   * @return a Map with String keys and Object values corresponding to the JSON str
   */
  public static Map<String, Object> deserialize(String str) throws IOException {
    // This is the return statement for this method.
    return jsonAdapter.fromJson(str);
  }

  /**
   * Given a uri, sends an HTTP request and output the content of the page
   *
   * @param uri a location for an HTTP request
   * @return the result of the HTTP request; the content of the page
   * @throws URISyntaxException if the uri is invalid
   * @throws IOException if an I/O exception occurs when sending or receiving
   * @throws InterruptedException if the send operation is interrupted
   */
  public static String scrapeHTTPRequest(String uri) throws URISyntaxException, IOException,
      InterruptedException {

    // Local request and response variables.
    HttpRequest request = HttpRequest.newBuilder().uri(new URI(uri)).GET().build();
    HttpResponse<String> response = HttpClient.newBuilder().build().send(request,
        HttpResponse.BodyHandlers.ofString());

    // This is the return statement of this method.
    return response.body();
  }
}
