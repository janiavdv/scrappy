package server.handlers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;
import utils.ServerUtilities;

public class QuoteHandler implements Route {

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> output = new HashMap<>();
    QueryParamsMap qm = request.queryMap();

    if (!qm.toMap().isEmpty()) {
      // todo: add error message in output
      return ServerUtilities.serialize(output);
    }

    String uri = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
    String json = ServerUtilities.scrapeHTTPRequest(uri);
    json = json.substring(2, json.length() - 1); // remove the "?(" and ")" from the string for our deserializer
    Map<String, Object> map = ServerUtilities.deserialize(json);

    String quote = (String) map.get("quoteText");
    String author = (String) map.get("quoteAuthor");

    output.put("quote", quote);
    output.put("author", author);

    return ServerUtilities.serialize(output);
  }
}
