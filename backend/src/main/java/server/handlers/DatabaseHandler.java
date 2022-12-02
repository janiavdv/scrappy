package server.handlers;

import database.User;
import java.util.HashMap;
import java.util.Map;
import org.bson.Document;
import server.Server;
import spark.Request;
import spark.Response;
import spark.Route;
import utils.DBDocumentUtil;
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
      case "ADD":
        String type = request.queryParams("type");
        switch (type) {
          case "USER":
            User user = new User();

            user.setEmail(request.queryParams("email"));
            user.setUsername(request.queryParams("username"));
            user.setName(request.queryParams("name"));
            user.setProfilePic(request.queryParams("profilePic"));

            Document newUser = DBDocumentUtil.convert(user);
            Server.getMyDatabase().getUsersColl().insertOne(newUser);

            return databaseSuccessResponse();
          case "ENTRY":
            break;
          case "BOOK":
            break;
        }
        break;
      case "QUERY":
        break;
      case "CHANGE":
        break;
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
