package database;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class MongoDB {

  private static MongoClient client;
  private static MongoDatabase database;
  private static MongoCollection<Document> usersColl;
  private static MongoCollection<Document> entriesColl;
  private static MongoCollection<Document> booksColl;

  public MongoDB() {
    client = MongoClients.create("mongodb+srv://acho28:scrappy@scrappy.uwn0mgi.mongodb.net/test");
    database = client.getDatabase("myDatabase");

    usersColl = database.getCollection("Users");
    entriesColl = database.getCollection("Entries");
    booksColl = database.getCollection("Books");
  }

  public MongoCollection<Document> getUsersColl() {
    return usersColl;
  }

  public MongoCollection<Document> getEntriesColl() {
    return entriesColl;
  }

  public MongoCollection<Document> getBooksColl() {
    return booksColl;
  }

}
