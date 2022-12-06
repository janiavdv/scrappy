package server;

import static spark.Spark.after;

import com.mongodb.client.MongoDatabase;
import database.MongoDB;
import server.handlers.DatabaseHandler;
import server.handlers.NYTHandler;
import spark.Spark;

/**
 * Top-level class "representing" the server.Server. Contains the main() method which
 * starts Spark and runs the various server.handlers.
 */
public class Server {

  private static MongoDB mongoDB;

  public static MongoDB getMyDatabase() {
    return mongoDB;
  }

  /**
   * Starts Spark and runs server.handlers to fetch API data.
   *
   * @param args of "type" String[]
   */
  public static void main(String[] args) {
    // Spark.port statement
    Spark.port(3232);
    after(
        (request, response) -> {
          response.header("Access-Control-Allow-Origin", "*");
          response.header("Access-Control-Allow-Methods", "*");
        });

    mongoDB = new MongoDB();

    Spark.get("database", new DatabaseHandler());
    // Setting up the handler for the GET endpoints.
    Spark.get("nyt", new NYTHandler());

    // Init/initializing Spark
    Spark.init();
    Spark.awaitInitialization();
    // Printing out to the console that the server has been started (helpful to the user)
    System.out.println("server.Server started.");
  }

}
