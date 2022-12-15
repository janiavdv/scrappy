package utils;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
// Above are the import statements for this class.

/**
 * This class, HTTPUtils, houses a method to take a website (an API link) and return the String
 * body. In other words, it helps with/is all the Json from the API, but in "String form".
 */
public class HTTPUtils {

  /**
   * A static method responsible for generating a string from the HTTP response. Notice that it
   * takes in a String representing the link of the website/API, as well as returns a String.
   *
   * <p>This is a util that developers can use on other APIs as well (see in testing we use it on
   * the cat facts site), they can very easily supply an API link, and get the JSON body of the API.
   *
   * @param link of type String; representing the link of the website/API
   * @return a String representing the HTTP response
   */
  public static String generateHTTPResponse(String link) {
    // Notice our use of a try-catch statement here to just return null (because the users cant see
    // the errors, we have to catch them)
    try {
      // First getting the request, with a GET request.
      HttpRequest request = HttpRequest.newBuilder().uri(new URI(link)).GET().build();
      HttpResponse<String> response =
          HttpClient.newBuilder().build().send(request, HttpResponse.BodyHandlers.ofString());
      return response.body(); // Getting the actual body text of json but in a string.
      // Catch URISyntaxExceptions, IOExceptions, and/or InterruptedExceptions.
    } catch (URISyntaxException | IOException | InterruptedException e) {
      // In this "case" (where you catch the exception), return null.
      return null;
    }
  }
}
