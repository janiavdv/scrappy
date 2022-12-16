import static org.junit.Assert.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.squareup.moshi.Moshi;
import database.MongoDB;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import okio.Buffer;
import java.util.Map;
import java.util.Stack;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.bson.Document;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import server.Server;
import server.handlers.DatabaseHandler;
import server.handlers.QuoteHandler;
import server.handlers.NYTHandler;
import spark.Spark;

/**
 * The test suite for this project.
 * Tests handle() in the handlers, as well as the static utility methods in ServerUtilities.
 */
public class HandlerTest {

  private static MongoDB testMongoDB;

  /**
   * Set the Spark port number. Remove the logging spam during tests.
   */
  @BeforeAll
  public static void setupServer() {
    Spark.port(0);
    Logger.getLogger("").setLevel(Level.WARNING); // empty name = root logger

    testMongoDB = new MongoDB();
    testMongoDB.setDatabase("mockDatabase");
    Server.setMyDatabase(testMongoDB);
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

    Spark.get("database", new DatabaseHandler());
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

  @Test
  public void testDatabaseAddUser() throws IOException {
    HttpURLConnection clientConnection = tryRequest("database?command=ADD&type=USER&email=a&username=b&name=c&profilePic=d&tags=[a,b,c]");
    assertEquals(200, clientConnection.getResponseCode());
    clientConnection.connect();

    // deserialize to a map to be able to check the result
    Map<String, Object> loadMap = getResponse(clientConnection);

    Map<String, Object> successResponse = new HashMap<>();
    successResponse.put("result", "success");
    assertTrue(loadMap.equals(successResponse));

    Document doc = Server.getMyDatabase().getUsersColl().find(new Document("username", "b")).first();

    assertEquals(doc.get("email"), "a");
    assertEquals(doc.get("username"), "b");
    assertEquals(doc.get("name"), "c");
    assertEquals(doc.get("profilePic"), "d");
    assertEquals(doc.get("tags"), List.of("a", "b", "c]"));
    assertTrue(doc.containsKey("friendsRequest"));
    assertTrue(doc.containsKey("friendsList"));
    assertTrue(doc.containsKey("books"));

    clientConnection.disconnect();
  }

  @Test
  public void testDatabaseAddEntry() throws IOException {
    HttpURLConnection clientConnection = tryRequest("database?command=ADD&type=ENTRY&title=a"
        + "&caption=b&time=3:00pm&date=12/15&tag=e&image=f&entryID=g&user=b&public=no");
    assertEquals(200, clientConnection.getResponseCode());
    clientConnection.connect();

    // deserialize to a map to be able to check the result
    Map<String, Object> loadMap = getResponse(clientConnection);

    Map<String, Object> successResponse = new HashMap<>();
    successResponse.put("result", "success");

    assertTrue(loadMap.equals(successResponse));

    Document doc = Server.getMyDatabase().getEntriesColl().find(new Document("title", "a")).first();
    assertEquals(doc.get("title"), "a");
    assertEquals(doc.get("caption"), "b");
    assertEquals(doc.get("time"), "3:00pm");
    assertEquals(doc.get("date"), "12/15");
    assertEquals(doc.get("tag"), "e");
    assertEquals(doc.get("imageLink"), "f");
    assertEquals(doc.get("entryID"), "g");
    assertEquals(doc.get("user"), "b");
    assertEquals(doc.get("publicized"), false);

    clientConnection.disconnect();
  }

  @Test
  public void testDatabaseAddBook() throws IOException {
    HttpURLConnection clientConnection = tryRequest("database?command=ADD&type=BOOK&title=a"
        + "&bookID=b&date=12/15&nyt=news!&quote=quote&username=b");
    assertEquals(200, clientConnection.getResponseCode());
    clientConnection.connect();

    // deserialize to a map to be able to check the result
    Map<String, Object> loadMap = getResponse(clientConnection);

    Map<String, Object> successResponse = new HashMap<>();
    successResponse.put("result", "success");

    assertTrue(loadMap.equals(successResponse));

    Document doc = Server.getMyDatabase().getUsersColl().find(new Document("username", "b")).first();
    assertNotEquals(Collections.emptyList(), doc.get("books"));

    clientConnection.disconnect();
  }

}

