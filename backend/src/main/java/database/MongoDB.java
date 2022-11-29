package database;

import com.mongodb.MongoException;
import com.mongodb.WriteResult;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.InsertOneModel;
import com.mongodb.client.model.InsertOneOptions;
import java.net.UnknownHostException;
import com.mongodb.MongoClient;
import java.util.ArrayList;
import java.util.Arrays;
import org.bson.Document;
import org.bson.types.ObjectId;

public class MongoDB {

  public static MongoClient client;
  public static MongoDatabase database;

  public static void main(String[] args) throws UnknownHostException {
    client = new MongoClient("localhost", 27017);
    database = client.getDatabase("myDatabase");
    MongoCollection<Document> coll = database.getCollection("Users");
    System.out.println(coll);

    Document user = new Document("_id", "tgurth");
    user.append("email", "tyler_gurth@brown.edu");
    user.append("books", new ArrayList<>())
        .append("entries", new ArrayList<>())
            .append("friends", new ArrayList<>());
    coll.insertOne(user);

    Document doc = coll.find(new Document("_id", "tgurth")).first();
    System.out.println(doc.toJson());
  }

//  public void addUser() {
//    Users user = new Users();
//    user.setUserName("link from aws here");
//    user.setPhotos("link from aws here");
//    user.setFriendsList("link from aws here");
//    user.setBooks("list from aws here");
//
//    DBObject query = new BasicDBObject();
//    test.find(query);
//  }

}
