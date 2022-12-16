package database;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import privacy.Credentials;
// Notice our import statements above.

/**
 * This is a class for the MongoDB.
 */
public class MongoDB {

  // Here we instantiate our instance variables for this MongoDB class.
  private static MongoClient client;
  private static MongoDatabase database;
  private static MongoCollection<Document> usersColl;
  private static MongoCollection<Document> entriesColl;

  /**
   * This is the constructor for our MongoDB class. Inside it, we initialize the instance variables
   * declared above.
   */
  public MongoDB() {
    client = MongoClients.create("mongodb+srv://acho28:"+ Credentials.databasePassword + "@scrappy.uwn0mgi.mongodb.net/test");
  }

  /**
   * Method for setting up the database (allows developer to choose which database within the Mongo
   * Client they would like to use)
   * @param databaseName The String name of the chosen database
   */
  public void setDatabase(String databaseName) {
    database = client.getDatabase(databaseName);
    usersColl = database.getCollection("Users");
    entriesColl = database.getCollection("Entries");
  }

  /**
   * This is a public getter method which returns a MongoCollection<Document> representing
   * usersColl (users' Collection).
   *
   * @return MongoCollection<Document> representing the user's collection (usersColl)
   */
  public MongoCollection<Document> getUsersColl() {
    return usersColl;
  }

  /**
   * This is a publuc getter method which returns a MongoCollection<Document> representing entries'
   * collection (entriesColl).
   *
   * @return MongoCollection<Document> representing the entry's collection (entriesColl)
   */
  public MongoCollection<Document> getEntriesColl() {
    return entriesColl;
  }

  // for testing
//  public void testingDatabase() {
//    database = client.getDatabase("mockDatabase");
//    usersColl = database.getCollection("Users");
//    entriesColl = database.getCollection("Entries");
//  }
}
