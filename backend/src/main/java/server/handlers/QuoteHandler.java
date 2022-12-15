package server.handlers;

import java.util.HashMap;
import java.util.Map;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;
import utils.ServerUtilities;
// Above we have our import statements for this class.

/**
 * This is the QuoteHandler class, which implements the Route interface.
 */
public class QuoteHandler implements Route {

  /**
   * This method, the handle method, is the main method of our QuoteHandler class. Notice that it
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
    // Local variable representing the output.
    Map<String, Object> output = new HashMap<>();
    // Local variable representing the qm.
    QueryParamsMap qm = request.queryMap();

    // Notice our use of an if-statement here.
    if (!qm.toMap().isEmpty()) {
      return ServerUtilities.serialize(output);
    }

    // Here we create local variables representing the uri, json, ...
    String uri = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
    String json = ServerUtilities.scrapeHTTPRequest(uri);
    json = json.substring(2, json.length() - 1); // remove the "?(" and ")" from the string for our deserializer
    Map<String, Object> map = ServerUtilities.deserialize(json);

    // Here we create String local variables representing the quote and the author.
    String quote = (String) map.get("quoteText");
    String author = (String) map.get("quoteAuthor");

    output.put("quote", quote);
    output.put("author", author);

    // This is the return statement for this method/function.
    return ServerUtilities.serialize(output);
  }
}
