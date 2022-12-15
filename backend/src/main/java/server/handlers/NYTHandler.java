package server.handlers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;
import utils.ServerUtilities;
// Here we have our import statements.

/**
 * This is our NYTHandler class which implements the Route interface.
 */
public class NYTHandler implements Route {

  // Here we have our KEY static variable (of type String).
  private static final String KEY = "LVN5uOQdT7gXAIXyiMtzLsAZdIND3Nm4";

  /**
   * This method, the handle method, is the main method of our NYTHandler class. Notice that it
   * takes in two parameters (one representing a request and the other response) and returns an
   * Object. Also, notice that it throws an Exception. Additionally, notice that it is overridden
   * from the Route interface.
   *
   * @param request of type Request, representing a request
   * @param response of type Response, representing a response
   * @return an Object
   * @throws Exception thrown in our handle method
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
    // Here we have a local variable representing the output.
    Map<String, Object> output = new HashMap<>();

    // Here we have a local variable representing the qm.
    QueryParamsMap qm = request.queryMap();

    // Notice our use of an if-statement here.
    if (!qm.toMap().isEmpty()) {
      return ServerUtilities.serialize(output);
    }

    // Here we have local variables representing the uri, json, map, ...
    String uri = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=" + KEY;
    String json = ServerUtilities.scrapeHTTPRequest(uri);
    Map<String, Object> map = ServerUtilities.deserialize(json);
    List results = (List) map.get("results");
    Map firstResult = (Map) results.get(0);
    String firstTitle = (String) firstResult.get("title");

    output.put("headline", firstTitle);

    // Return statement of our method
    return ServerUtilities.serialize(output);
  }
}
