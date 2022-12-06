package database;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import java.net.UnknownHostException;
import com.mongodb.MongoClient;
import org.bson.Document;

public class MongoDB {

  private static MongoClient client;
  private static MongoDatabase database;
  private static MongoCollection<Document> usersColl;

  public MongoDB() {
    client = new MongoClient("localhost", 27017);
    database = client.getDatabase("myDatabase");
    usersColl = database.getCollection("Users");

//    System.out.println(coll);
//
//    Document user = new Document("_id", "tgurth");
//    user.append("email", "tyler_gurth@brown.edu");
//    user.append("books", new ArrayList<>())
//        .append("entries", new ArrayList<>())
//            .append("friends", new ArrayList<>());
//    coll.insertOne(user);
//
//    Document doc = coll.find(new Document("_id", "tgurth")).first();
//    System.out.println(doc.toJson());
  }

  public MongoDatabase getDatabase() {
    return database;
  }

  public MongoCollection<Document> getUsersColl() {
    return usersColl;
  }


}
