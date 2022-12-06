package database;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import java.net.UnknownHostException;
import java.util.ArrayList;
import org.bson.Document;

public class MongoDB {

  private static MongoClient client;
  private static MongoDatabase database;
  private static MongoCollection<Document> usersColl;

  public MongoDB() {
    client = MongoClients.create("mongodb+srv://acho28:scrappy@scrappy.uwn0mgi.mongodb.net/test");
    database = client.getDatabase("myDatabase");
    System.out.println(database);
    usersColl = database.getCollection("Users");

//    System.out.println(usersColl);
//
//    Document user = new Document("_id", "tgurth");
//    user.append("email", "tyler_gurth@brown.edu");
//    user.append("books", new ArrayList<>())
//        .append("entries", new ArrayList<>())
//            .append("friends", new ArrayList<>());
//    usersColl.insertOne(user);

//    Document doc = usersColl.find(new Document("_id", "tgurth")).first();
//    System.out.println(doc.toJson());
  }

  public MongoDatabase getDatabase() {
    return database;
  }

  public MongoCollection<Document> getUsersColl() {
    return usersColl;
  }


}
