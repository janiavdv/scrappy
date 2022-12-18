package server.handlers;

import com.mongodb.client.FindIterable;
import java.util.ArrayList;
import java.util.List;
import org.bson.Document;
import server.Server;
import spark.Request;
import spark.Response;
import spark.Route;

public class GalleryHandler implements Route {

  @Override
  public Object handle(Request request, Response response) throws Exception {

    List<String> userTags = this.getUserTags(request.queryParams("username"));
    List<String> comparableTags = this.getComparableTags(request.queryParams("date"));

    // algorithm to calculate similarity score here

    return null;
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

  private List<String> getComparableTags(String date) {
    FindIterable<Document> dayEntries = Server.getMyDatabase().getUsersColl()
        .find(new Document("date", date));

    List<Document> publicEntries = new ArrayList<>();

    for (Document entry : dayEntries) {
      if (entry.get("publicized").equals(true)) {
        publicEntries.add(entry);
      }
    }

    List<String> entryTags = new ArrayList<>();

    for (Document validEntry: publicEntries) {
      String tag = validEntry.get("tag").toString();
      entryTags.add(tag);
    }

    return entryTags;
    // Alternative
//    List<String> publicEntries = new ArrayList<>();
//
//    for (Document entry : dayEntries) {
//      String jsonEntry = entry.toJson();
//      if (entry.get("publicized").equals(true)) {
//        publicEntries.add(jsonEntry);
//      }
//    }
//
//    List<String> entryTags = new ArrayList<>();
//
//    for (String validEntry: publicEntries) {
//      validEntry.
//    }
  }
}
