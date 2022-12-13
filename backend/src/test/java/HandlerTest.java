import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.squareup.moshi.Moshi;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

import okio.Buffer;
import java.util.Map;
import java.util.Stack;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import server.handlers.QuoteHandler;
import server.handlers.NYTHandler;
import spark.Spark;

/**
 * The test suite for this project.
 * Tests handle() in the handlers, as well as the static utility methods in ServerUtilities.
 */
public class HandlerTest {

  /**
   * Set the Spark port number. Remove the logging spam during tests.
   */
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
      loadedPath.pop();
    }

    Spark.get("quote", new QuoteHandler());
    Spark.get("nyt", new NYTHandler());

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
   * Tests that a headline is returned when /nyt is called
   * @throws IOException
   */
  @Test
  public void testNYT() throws IOException {

    // call nyt
    HttpURLConnection clientConnection = tryRequest("nyt");
    assertEquals(200, clientConnection.getResponseCode());
    clientConnection.connect();

    // deserialize to a map to be able to check the result
    Map<String, Object> loadMap = getResponse(clientConnection);
    // test that a headline was returned
    assertTrue(loadMap.size() == 1);
    assertTrue(loadMap.get("headline") instanceof String);

    clientConnection.disconnect();
  }

  /**
   * Tests that a quote and its author are returned when /quote is called
   * @throws IOException
   */
  @Test
  public void testQuote() throws IOException {

    // call quote
    HttpURLConnection clientConnection = tryRequest("quote");
    assertEquals(200, clientConnection.getResponseCode());
    clientConnection.connect();

    // deserialize to a map to be able to check the result
    Map<String, Object> loadMap = getResponse(clientConnection);
    // test that a quote and author were returned
    assertTrue(loadMap.size() == 2);
    assertTrue(loadMap.get("quote") instanceof String);
    assertTrue(loadMap.get("author") instanceof String);

    clientConnection.disconnect();
  }

}

