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

/**
 * This is our DatabaseHandler class, which implements the Route interface.
 * It handles the logic behind filling the gallery.
 */
public class GalleryHandler implements Route {

  /**
   * In the handle method we take in the parameters and return a list of Entry objects to the
   * frontend in json format.
   * @param request the associated parameters
   * @param response
   * @return a Json map containing a result and posts array
   * @throws Exception
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> reply = new HashMap<>();

    if (request.queryParams("username") == null || request.queryParams("date") == null) {
      reply.put("result", "failure");
      return new ResponseUtil(reply).serialize();
    }
    try {
      // We grab the tags of a user, as well as all the available public posts we *could* display.
      ArrayList<String> userTags = (ArrayList<String>) this.getUserTags(request.queryParams("username"));
      HashMap<String, ArrayList<Object>> tagToEntries = this.getComparableTags(request.queryParams("date"), request.queryParams("username"));


      // We use the algorithmic method generatePostList to create a list of Entries in order that
      // we want to fill the gallery with.
      ArrayList<Object> orderedEntries = VectorUtil.generatePostList(userTags, tagToEntries);
      // Putting it into a map.
      reply.put("result", "success");
      reply.put("posts", orderedEntries);
      return new ResponseUtil(reply).serialize();

    } catch(Exception e) {
      reply.put("result", "failure");
      return new ResponseUtil(reply).serialize();
    }
  }

  /**
   * Helper method which grabs the tags (interests) of a given user.
   * @param username the user for which to get the informaiton of.
   * @return a list of their interests, strings.
   */
  private List<String> getUserTags(String username) {
    try {
      // Grabbing the user from the database.
      Document user = Server.getMyDatabase().getUsersColl().find(
          new Document("username", username)).first();
      // Getting their list of tags.
      List<String> tags = user.getList("tags", String.class);
      return tags;
    } catch (NullPointerException e) {
      return new ArrayList<String>();
    }
  }

  /**
   * Helper method to get all the comparable posts, a map of each tag to the list of posts
   * that share that tag (as they will be ordered together).
   * @param date the date of posts we want
   * @param username the username of the person, so we don't grab their posts.
   * @return a HashMap of string to object, tag to list of Entry posts.
   */
  private HashMap<String, ArrayList<Object>> getComparableTags(String date, String username) {
    // We grab all the entries that match the current date.
    FindIterable<Document> dayEntries = Server.getMyDatabase().getEntriesColl()
        .find(new Document("date", date));
    List<Document> publicEntries = new ArrayList<>();

    // We take all the entries that are 1. public and 2. not the logged in user's
    for (Document entry : dayEntries) {
      if (entry.get("publicized", Boolean.class).equals(true) && !entry.get("user", String.class).equals(username)) {
        // Adding to our acceptable entries.
        publicEntries.add(entry);
      }
    }

    HashMap<String, ArrayList<Object>> tagToEntries = new HashMap<>();

    // Associating the tag to each entry
    for (Document validEntry: publicEntries) {
      String tag = validEntry.get("tag").toString();
      if (tagToEntries.containsKey(tag)) { // If it is already in the map
        tagToEntries.get(tag).add(validEntry);
      } else {
        ArrayList<Object> entryList = new ArrayList<>();
        entryList.add(validEntry);
        tagToEntries.put(tag, entryList);
      }
    }

    // We return the hashamp of tag -> list of entries.
    return tagToEntries;
  }
}
