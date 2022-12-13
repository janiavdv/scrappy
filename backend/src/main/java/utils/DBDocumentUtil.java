package utils;

import com.google.gson.Gson;
import com.mongodb.DBCollection;
import org.bson.Document;
import server.Server;


public class DBDocumentUtil {

  //https://stackoverflow.com/questions/10170506/inserting-java-object-to-mongodb-collection-using-java
  public static Document convert(Object obj) {
    Gson gson = new Gson();
    return Document.parse(gson.toJson(obj));
  }

}
