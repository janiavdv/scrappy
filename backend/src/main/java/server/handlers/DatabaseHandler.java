package server.handlers;

import com.mongodb.BasicDBObject;
import database.Book;
import database.User;
import database.Entry;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.bson.Document;
import server.Server;
import spark.Request;
import spark.Response;
import spark.Route;
import utils.DBDocumentUtil;
import utils.ResponseUtil;
import utils.ServerUtilities;

public class DatabaseHandler implements Route {

  public DatabaseHandler() {

  }

  @Override
  public Object handle(Request request, Response response) throws Exception {

    if (request.queryParams().size() == 0) {
      return databaseFailureResponse("not enough arguments");
    }

    String command = request.queryParams("command");
    switch (command) {
      case "ADD" -> {
        String type = request.queryParams("type");
        switch (type) {
          case "USER" -> {
            User user = new User();
            user.setEmail(request.queryParams("email"));
            user.setUsername(request.queryParams("username"));
            user.setName(request.queryParams("name"));
            user.setProfilePic(request.queryParams("profilePic"));
            String tags = request.queryParams("tags").replace("[", "");
            tags.replace("]", "");
            tags.replace("\"", "");
            System.out.println(tags);
            List<String> tagsList = List.of(tags.split(","));
            user.setTags(tagsList);
            Document newUser = DBDocumentUtil.convert(user);
            Server.getMyDatabase().getUsersColl().insertOne(newUser);
            return databaseSuccessResponse();
          }
          case "ENTRY" -> {
            Entry entry = new Entry();
            entry.setTitle(request.queryParams("title"));
            entry.setCaption(request.queryParams("caption"));
            entry.setTime(request.queryParams("time"));
            entry.setTag(request.queryParams("tag"));
            entry.setImageLink(request.queryParams("image"));
            entry.setEntryID(request.queryParams("entryID"));
            entry.setUser(request.queryParams("user"));
            Document newEntry = DBDocumentUtil.convert(entry);
            Server.getMyDatabase().getEntriesColl().insertOne(newEntry);
            return databaseSuccessResponse();
          }
          case "BOOK" -> {
            Book book = new Book();
            book.setTitle(request.queryParams("title"));
            book.setBookID(request.queryParams("bookID"));
            book.setDate(request.queryParams("date"));
            Document newBook = DBDocumentUtil.convert(book);
            Server.getMyDatabase().getBooksColl().insertOne(newBook);
            return databaseSuccessResponse();
          }
        }
      }
      case "QUERY" -> {
        String cType = request.queryParams("type");
        Document doc;
        Map<String, Object> reply = new HashMap<>();
        switch (cType) {
          case "USERNAME" -> {
            doc = Server.getMyDatabase().getUsersColl()
                .find(new Document("username", request.queryParams("username"))).first();
            reply.put("result", "success");
            reply.put("User", doc);

            return new ResponseUtil(reply).serialize();
          }
          case "EMAIL" -> {
            try {
              doc = Server.getMyDatabase().getUsersColl()
                  .find(new Document("email", request.queryParams("email"))).first();
              reply.put("result", "success");
              reply.put("User", doc);

              return new ResponseUtil(reply).serialize();
            } catch (Exception e) {
              return this.databaseFailureResponse("failure.");
            }
          }
          case "BOOK" -> {
            doc = Server.getMyDatabase().getBooksColl()
                .find(new Document("title", request.queryParams("title"))).first();

            reply.put("result", "success");
            reply.put("Book", doc);

            return new ResponseUtil(reply).serialize();
          }
        }
      }
      case "UPDATE" -> {
        String updateType = request.queryParams("type");
        switch (updateType) {
          case "BOOK":
            try {
              Document target = Server.getMyDatabase().getBooksColl().find(new Document("bookID",
                  request.queryParams("bookID"))).first();
              if (target != null) {
                target.append("entryIDs", request.queryParams("entryID"));
              }
              return databaseSuccessResponse();
            } catch (NullPointerException e) {
              return databaseFailureResponse("No book with this ID.");
            }
          case "FRIENDS":
            try {
              Document target = Server.getMyDatabase().getUsersColl().find(new Document("username", request.queryParams("username"))).first();
              if (target != null) {
                target.append("friendsList", request.queryParams("newFriend"));
              }
              return databaseSuccessResponse();
            } catch (NullPointerException e) {
              return databaseFailureResponse("No user by this name.");
            }
        }
      }
    }
    return null;
  }

  public String databaseSuccessResponse() {

    Map<String, Object> successResponse = new HashMap<>();
    successResponse.put("result", "success");

    return ServerUtilities.serialize(successResponse);
  }

  /**
   * Returns a serialized failure response, including the appropriate error type.
   *
   * @param responseType Desired error message
   * @return String failure message
   */
  public String databaseFailureResponse(String responseType) {
    Map<String, Object> failureResponse = new HashMap<>();
    failureResponse.put("result", responseType);

    return ServerUtilities.serialize(failureResponse);
  }

}
