package server.handlers;

import com.mongodb.client.FindIterable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.bson.Document;
import server.Server;
import spark.Request;
import spark.Response;
import spark.Route;
import utils.ResponseUtil;
import utils.VectorUtil;

public class GalleryHandler implements Route {

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> reply = new HashMap<>();

    try {
      ArrayList<String> userTags = (ArrayList<String>) this.getUserTags(request.queryParams("username"));
      HashMap<String, ArrayList<Object>> tagToEntries = this.getComparableTags(request.queryParams("date"), request.queryParams("username"));

//    // algorithm to calculate similarity score here//
      ArrayList<Object> orderedEntries = VectorUtil.generatePostList(userTags, tagToEntries);
      System.out.println("Ordered Entries: " + orderedEntries);
      reply.put("result", "success");
      reply.put("posts", orderedEntries);
      return new ResponseUtil(reply).serialize();

    } catch(Exception e) {
      reply.put("result", "failure");
      return new ResponseUtil(reply).serialize();
    }
  }

  private List<String> getUserTags(String username) {
    try {
      Document user = Server.getMyDatabase().getUsersColl().find(
          new Document("username", username)).first();
      List<String> tags = user.getList("tags", String.class);
      return tags;
    } catch (NullPointerException e) {
      return null; // need to write failure response
    }
  }

  private HashMap<String, ArrayList<Object>> getComparableTags(String date, String username) {
    FindIterable<Document> dayEntries = Server.getMyDatabase().getEntriesColl()
        .find(new Document("date", date));
    List<Document> publicEntries = new ArrayList<>();

    for (Document entry : dayEntries) {
      if (entry.get("publicized", Boolean.class).equals(true) && !entry.get("user", String.class).equals(username)) {
        publicEntries.add(entry);
      }
    }

    HashMap<String, ArrayList<Object>> tagToEntries = new HashMap<>();

    for (Document validEntry: publicEntries) {
      String tag = validEntry.get("tag").toString();
      if (tagToEntries.containsKey(tag)) {
        tagToEntries.get(tag).add(validEntry);
      } else {
        ArrayList<Object> entryList = new ArrayList<>();
        entryList.add(validEntry);
        tagToEntries.put(tag, entryList);
      }
    }

    return tagToEntries;
  }
}
