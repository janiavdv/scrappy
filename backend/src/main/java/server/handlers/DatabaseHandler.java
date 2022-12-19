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
// Here we have our import statements for the DatabaseHandler class.

/**
 * This is our DatabaseHandler class, which implements the Route interface.
 */
public class DatabaseHandler implements Route {

  /**
   * This is constructor for our DatabaseHandler class.
   */
  public DatabaseHandler() {
  }

  /**
   * This method, the handle method, is the main method of our DatabaseHandler class. It takes in
   * two parameters (a request and a response) and returns an Object. Notice that this method is
   * overridden from the Route interface.
   *
   * @param request of type Request, representing a request
   * @param response of type Response, representing a response
   * @return an Object
   */
  @Override
  public Object handle(Request request, Response response) {

    // If statement for the case where the request's queryParams size is 0 (not enough arguments).
    if (request.queryParams().size() == 0) {
      return databaseFailureResponse("not enough arguments");
    }

    // Creating a local variable representing the command.
    String command = request.queryParams("command");

    // A switch statement which is switching on our command (local variable).
    switch (command) {

      // Case where command is ADD.
      case "ADD" -> {
        // Creating a local variable representing the type.
        String type = request.queryParams("type");

        // A switch statement which is switching on our type (local variable).
        switch (type) {

          // Case where command is ADD and type is USER.
          case "USER" -> {
            // Creating a new user.
            User user = new User();
            // Setting all the Users' respective elements.
            user.setEmail(request.queryParams("email"));
            user.setUsername(request.queryParams("username"));
            user.setName(request.queryParams("name"));
            user.setProfilePic(request.queryParams("profilePic"));
            String tags = request.queryParams("tags").replace("[", "");
            tags.replace("]", "");
            tags.replace("\"", "");
            List<String> tagsList = List.of(tags.split(","));
            user.setTags(tagsList);
            Document newUser = DBDocumentUtil.convert(user);
            Server.getMyDatabase().getUsersColl().insertOne(newUser);
            // Return the databaseSuccessResponse.
            return databaseSuccessResponse();
          }

          // Case where command is ADD and type is ENTRY.
          case "ENTRY" -> {
            // Creating a new entry.
            Entry entry = new Entry();
            // Setting all of the entry's necessary components
            entry.setTitle(request.queryParams("title"));
            entry.setCaption(request.queryParams("caption"));
            entry.setTime(request.queryParams("time"));
            entry.setDate(request.queryParams("date"));
            entry.setTag(request.queryParams("tag"));
            entry.setImageLink(request.queryParams("image"));
            entry.setEntryID(request.queryParams("entryID"));
            entry.setUser(request.queryParams("user"));
            entry.setPublicity(request.queryParams("public"));
            Document newEntry = DBDocumentUtil.convert(entry);
            System.out.println(newEntry.toJson());
            Server.getMyDatabase().getEntriesColl().insertOne(newEntry);
            // Return a databaseSuccessResponse in this case.
            return databaseSuccessResponse();
          }

          // Case where command is ADD and type is BOOK.
          case "BOOK" -> {
            // Creating a new Book.
            Book book = new Book();
            // Setting all of the Book's necessary components.
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
            // Return a databaseSuccessResponse in this case.
            return databaseSuccessResponse();
          }
        }
      }

      // Case where command is QUERY.
      case "QUERY" -> {
        // Local variable representing the cType.
        String cType = request.queryParams("type");
        Document doc;
        // Creating a local reply/HashMap variable.
        Map<String, Object> reply = new HashMap<>();

        // A switch statement on the cType.
        switch (cType) {

          // Case where command is QUERY and cType is USERNAME.
          case "USERNAME" -> {
            doc = Server.getMyDatabase().getUsersColl()
                .find(new Document("username", request.queryParams("username"))).first();
            reply.put("result", "success");
            reply.put("User", doc);
            // Return statement i this case.
            return new ResponseUtil(reply).serialize();
          }

          // Case where command is QUERY and cType is EMAIl.
          case "EMAIL" -> {
            try {
              doc = Server.getMyDatabase().getUsersColl()
                  .find(new Document("email", request.queryParams("email"))).first();
              reply.put("result", "success");
              reply.put("User", doc);
              // Return statement in this case.
              return new ResponseUtil(reply).serialize();
              // Catch Exception e
            } catch (Exception e) {
              return this.databaseFailureResponse("failure");
            }
          }

          // Case where command is QUERY and cType is ENTRY.
          case "ENTRY" -> {
            doc = Server.getMyDatabase().getEntriesColl()
                .find(new Document("entryID", request.queryParams("entryID"))).first();
            reply.put("result", "success");
            reply.put("Entry", doc);
            // Return statement in this case.
            return new ResponseUtil(reply).serialize();
          }
        }
      }

      // Case where command is UPDATE.
      case "UPDATE" -> {
        System.out.println("update");
        // Local variable representing the updateType.
        String updateType = request.queryParams("type");

        // A switch statement on updateType.
        switch (updateType) {

          // Case where the command is UPDATE and the updateType is BOOK.
          case "BOOK":
            // Notice our use of a try-catch statement here.
            try {
              Bson filter = Filters.eq("username", request.queryParams("username"));
              Bson secondFilter = Filters.eq("books.bookID", request.queryParams("bookID"));
              Server.getMyDatabase().getUsersColl().findOneAndUpdate((Filters.and(filter, secondFilter)), new Document("$push", new Document("books.$.entries", request.queryParams("entryID"))));
              return databaseSuccessResponse();
              // Catch NullPointer Exception e
            } catch (NullPointerException e) {
              return databaseFailureResponse("No book with this ID.");
            }
            // Case where the command is UPDATE and the updateType is FRIEND-REQUEST.
          case "FRIEND-REQUEST":
            Bson filteredUser = Filters.eq( "username", request.queryParams("username"));
            Bson update = Updates.push("friendsRequest", request.queryParams("friendRequest"));
            FindOneAndUpdateOptions options = new FindOneAndUpdateOptions()
                .returnDocument(ReturnDocument.AFTER);
            Server.getMyDatabase().getUsersColl().findOneAndUpdate(filteredUser, update, options);
            // Return statement in this case.
            return databaseSuccessResponse();
          // Case where the command is UPDATE and the updateType is NEW-FRIEND.
          case "NEW-FRIEND":
            // Notice our use of a try-catch statement here.
            try {
              Bson filteredUser1 = Filters.eq("username", request.queryParams("username"));
              Bson addFriend = Updates.push("friendsList", request.queryParams("newFriend"));
              FindOneAndUpdateOptions addedFriend = new FindOneAndUpdateOptions()
                  .returnDocument(ReturnDocument.AFTER);

              Bson removeRequest = Updates.pull("friendsRequest", request.queryParams("newFriend"));
              FindOneAndUpdateOptions removedFriend = new FindOneAndUpdateOptions().returnDocument(ReturnDocument.AFTER);

              Server.getMyDatabase().getUsersColl().findOneAndUpdate(filteredUser1, addFriend, addedFriend);
              Server.getMyDatabase().getUsersColl().findOneAndUpdate(filteredUser1, removeRequest, removedFriend);


              // Now we also give the friend to the other person!
              filteredUser1 = Filters.eq("username", request.queryParams("newFriend"));
              addFriend = Updates.push("friendsList", request.queryParams("username"));
              addedFriend = new FindOneAndUpdateOptions()
                  .returnDocument(ReturnDocument.AFTER);
              Server.getMyDatabase().getUsersColl().findOneAndUpdate(filteredUser1, addFriend, addedFriend);


              return databaseSuccessResponse();
              // Catch NullPointerException e
            } catch (NullPointerException e) {
              return databaseFailureResponse("No user by this name.");
            }
        }
      }
      case "REMOVE-FRIEND" -> {
        Bson filteredUser = Filters.eq("username", request.queryParams("username"));
        Bson removeRequest;
        FindOneAndUpdateOptions removedFriend = new FindOneAndUpdateOptions().returnDocument(ReturnDocument.AFTER);

        if (Boolean.parseBoolean(request.queryParams("isRequest"))) {
          removeRequest = Updates.pull("friendsRequest", request.queryParams("removedFriend"));
        } else {
          removeRequest = Updates.pull("friendsList", request.queryParams("removedFriend"));
          Server.getMyDatabase().getUsersColl().findOneAndUpdate(filteredUser, removeRequest, removedFriend);

          filteredUser = Filters.eq("username", request.queryParams("removedFriend"));
          removeRequest = Updates.pull("friendsList", request.queryParams("username"));
        }

        Server.getMyDatabase().getUsersColl().findOneAndUpdate(filteredUser, removeRequest, removedFriend);
        return databaseSuccessResponse();
      }
    }
    // Return null if it doesn't enter any of these cases.
    return null;
  }

  /**
   * Public method for the databaseSuccessResponse, which returns a String.
   *
   * @return a String representing the databaseSuccessResponse
   */
  public String databaseSuccessResponse() {
    // Local variable (of type HashMap) representing the successResponse
    Map<String, Object> successResponse = new HashMap<>();
    successResponse.put("result", "success");
    // Return statement here.
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
    // Return statement here.
    return ServerUtilities.serialize(failureResponse);
  }
}