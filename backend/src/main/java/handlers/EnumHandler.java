package handlers;

import database.User;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class EnumHandler implements Route {

  @Override
  public Object handle(Request request, Response response) throws Exception {
    if (request.queryParams().size() == 0) {
//      return new EnumResponse;
    }

    String command = request.queryParams("command");
    switch(command) {
      case "ADD":
        String type = request.queryParams("type");
        switch(type) {
          case "USER":
            User user = new User();
            user.setEmail("email");
            user.setUserName(request.queryParams("username"));
            break;
//          case ENTRY:
//            break;
//          case BOOK:
//            break;
        }
        break;
      case "QUERY":
        break;
      case "CHANGE":
        break;
    }
    return null;
  }

  public record EnumResponse(Map<String, Object> response) {

  }
}
