package server.handlers;

import com.mongodb.client.model.Filters;
import com.mongodb.client.model.FindOneAndUpdateOptions;
import com.mongodb.client.model.ReturnDocument;
import com.mongodb.client.model.Updates;
import database.Book;
import database.User;
import database.Entry;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.bson.Document;
import org.bson.conversions.Bson;
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
            entry.setDate(request.queryParams("date"));
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
            book.setNyt(request.queryParams("nyt"));
            book.setQuote(request.queryParams("quote"));
            Document newBook = DBDocumentUtil.convert(book);

            Bson filter = Filters.eq("username", request.queryParams("username"));
            Bson update = Updates.push("books", newBook);
            FindOneAndUpdateOptions options = new FindOneAndUpdateOptions()
                .returnDocument(ReturnDocument.AFTER);
            Server.getMyDatabase().getUsersColl().findOneAndUpdate(filter, update, options);

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
              return this.databaseFailureResponse("failure");
            }
          }
          case "ENTRY" -> {
            doc = Server.getMyDatabase().getEntriesColl()
                .find(new Document("entryID", request.queryParams("entryID"))).first();
            reply.put("result", "success");
            reply.put("Entry", doc);

            return new ResponseUtil(reply).serialize();
          }
//          case "BOOK" -> {
//            doc = Server.getMyDatabase().getUsersColl()
//                .find(new Document("books", request.queryParams("bookID"))).first();
//
//            reply.put("result", "success");
//            reply.put("Book", doc);
//
//            return new ResponseUtil(reply).serialize();
//          }
        }
      }
      case "UPDATE" -> {
        System.out.println("update");
        String updateType = request.queryParams("type");
        switch (updateType) {
          case "BOOK":
            try {
              Bson filter = Filters.eq("username", request.queryParams("username"));
              Bson secondFilter = Filters.eq("books.bookID", request.queryParams("bookID"));
              Server.getMyDatabase().getUsersColl().findOneAndUpdate((Filters.and(filter, secondFilter)), new Document("$push", new Document("books.$.entries", request.queryParams("entryID"))));
//
//              Bson filter = Filters.eq("bookID", request.queryParams("bookID"));
//              Bson update = Updates.push("entries", request.queryParams("entryID"));
//              System.out.println(filter);
//              System.out.println(update);
//              FindOneAndUpdateOptions options = new FindOneAndUpdateOptions()
//                  .returnDocument(ReturnDocument.AFTER);
//              Server.getMyDatabase().getUsersColl().findOneAndUpdate(filter, update, options);
              return databaseSuccessResponse();
            } catch (NullPointerException e) {
              return databaseFailureResponse("No book with this ID.");
            }
          case "FRIEND-REQUEST":
            Bson filteredUser = Filters.eq( "username", request.queryParams("username"));
            Bson update = Updates.push("friendsRequest", request.queryParams("friendRequest"));
            FindOneAndUpdateOptions options = new FindOneAndUpdateOptions()
                .returnDocument(ReturnDocument.AFTER);
            Server.getMyDatabase().getUsersColl().findOneAndUpdate(filteredUser, update, options);
            return databaseSuccessResponse();
          case "NEW-FRIEND":
            try {
              Bson filteredUser1 = Filters.eq("username", request.queryParams("username"));
              Bson addFriend = Updates.push("friendsList", request.queryParams("newFriend"));
              FindOneAndUpdateOptions addedFriend = new FindOneAndUpdateOptions()
                  .returnDocument(ReturnDocument.AFTER);

              Bson removeRequest = Updates.pull("friendsRequest", request.queryParams("newFriend"));
              FindOneAndUpdateOptions removedFriend = new FindOneAndUpdateOptions().returnDocument(ReturnDocument.AFTER);

              Server.getMyDatabase().getUsersColl().findOneAndUpdate(filteredUser1, addFriend, addedFriend);
              Server.getMyDatabase().getUsersColl().findOneAndUpdate(filteredUser1, removeRequest, removedFriend);
              return databaseSuccessResponse();
            } catch (NullPointerException e) {
              return databaseFailureResponse("No user by this name.");
            }
        }
      }
      case "GALLERY" -> {
        try {
          Document user = Server.getMyDatabase().getUsersColl().find(new Document("username", request.queryParams("username"))).first();
          if (user != null) {
            List<String> tags = user.getList("tags", String.class);
            System.out.println(tags);
          }
          return databaseSuccessResponse();
        } catch (NullPointerException e) {
          return this.databaseFailureResponse("No user found by this name.");
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
