package utils;

import com.google.gson.Gson;
import org.bson.Document;
// Above are the import statements for this class.

/**
 * This is the DBDocumentUtil class.
 */
public class DBDocumentUtil {

  /**
   * This is the main method of our DBDocumentUtil class. This method, convert, takes in an obj of
   * type Object and returns a Document. To make this method, we used the following StackOverFlow
   * article:
   * https://stackoverflow.com/questions/10170506/inserting-java-object-to-mongodb-collection-using-java.
   *
   * @param obj of type Object
   * @return a Document
   */
  public static Document convert(Object obj) {
    // gson local variable
    Gson gson = new Gson();
    // Return statement
    return Document.parse(gson.toJson(obj));
  }

}
