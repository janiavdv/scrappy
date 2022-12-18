package server;

import static spark.Spark.after;

import database.MongoDB;
import server.handlers.DatabaseHandler;
import server.handlers.GalleryHandler;
import server.handlers.NYTHandler;
import server.handlers.QuoteHandler;
import spark.Spark;

/**
 * Top-level class "representing" the server.Server. Contains the main() method which
 * starts Spark and runs the various server.handlers.
 */
public class Server {

  // Here we declare the instance variables for the Server class.
  private static MongoDB mongoDB;

  // This method is primarily used for testing, as we needed to set our server's database to be the
  // mock database
  public static void setMyDatabase(MongoDB database) {
    mongoDB = database;
  }

  /**
   * A static getter method which gets the Database.
   *
   * @return MongoDB representing the database
   */
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
    mongoDB.setDatabase("myDatabase");

    Spark.get("database", new DatabaseHandler());
    Spark.get("gallery", new GalleryHandler());

    // Setting up the handler for the GET endpoints.
    Spark.get("nyt", new NYTHandler());
    Spark.get("quote", new QuoteHandler());

    // Init/initializing Spark
    Spark.init();
    Spark.awaitInitialization();

    // Printing out to the console that the server has been started (helpful to the user)
    System.out.println("server.Server started.");
  }
}
