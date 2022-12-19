import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.squareup.moshi.Moshi;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Stack;
import java.util.logging.Level;
import java.util.logging.Logger;
import okio.Buffer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import server.handlers.GalleryHandler;
import spark.Spark;

/**
 * Tests that the algorithm and its components work.
 */
public class AlgorithmHandlerTest {

  public static HashMap<String, ArrayList<Double>> wordEmbeddings;

  @BeforeAll
  public static void setupServer() {
    Spark.port(0);
    Logger.getLogger("").setLevel(Level.WARNING); // empty name = root logger
  }

  // Shared state for all tests.
  Stack<String> loadedPath = new Stack<>();

  /**
   * Setup method to reset the Stack to empty and add Spark endpoints/handlers.
   */
  @BeforeEach
  public void setup() {

    // Re-initialize state of Stack
    while (!this.loadedPath.empty()) {
      this.loadedPath.pop();
    }

    Spark.get("gallery", new GalleryHandler());

    Spark.init();
    Spark.awaitInitialization();
  }

  /**
   * Teardown method to unmap endpoints.
   */
  @AfterEach
  public void teardown() {
    Spark.unmap("/quote");
    Spark.unmap("/nyt");
    Spark.unmap("/database");

    Spark.awaitStop(); // don't continue until server stops
  }

  /**
   * Helper to start a connection to a specific API endpoint/params
   *
   * @param apiCall the call string, including endpoint
   * @return the connection for the given URL, just after connecting
   * @throws IOException if the connection fails for some reason
   */
  private static HttpURLConnection tryRequest(String apiCall) throws IOException {
    URL requestURL = new URL("http://localhost:" + Spark.port() + "/" + apiCall);
    HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
    clientConnection.connect();
    return clientConnection;
  }

  /**
   * Helper for testing that converts the connection into a deserialized JSON map from the API
   *
   * @param clientConnection httpURLConnection
   * @return Map of String keys and Object values containing the content from the API
   * @throws IOException
   */
  public static Map<String, Object> getResponse(HttpURLConnection clientConnection) throws IOException {
    Moshi moshi = new Moshi.Builder().build();
    return moshi.adapter(Map.class).fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
  }

  /**
   * Tests that an error is thrown on wrong entry
   * @throws IOException
   */
  @Test
  public void testEmptyGallery() throws IOException {
    HttpURLConnection clientConnection = tryRequest("gallery");
    assertEquals(200, clientConnection.getResponseCode());
    clientConnection.connect();

    // deserialize to a map to be able to check the result
    Map<String, Object> loadMap = getResponse(clientConnection);
    // test that a headline was returned
    assertTrue(loadMap.size() == 1);
    clientConnection.disconnect();
  }
}
