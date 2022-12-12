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

    String uri = "https://zenquotes.io/api/random/[your_key]";
    String json = ServerUtilities.scrapeHTTPRequest(uri);
    Map<String, Object> map = ServerUtilities.deserialize(json);

    String quote = (String) map.get("q");
    String author = (String) map.get("a");

    output.put("quote", quote);
    output.put("author", author);

    return ServerUtilities.serialize(output);
  }
}
