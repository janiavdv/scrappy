import static spark.Spark.after;
import spark.Spark;

/**
 * Top-level class "representing" the Server. Contains the main() method which
 * starts Spark and runs the various handlers.
 */
public class Server {

  /**
   * Starts Spark and runs handlers to fetch API data.
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

    // Setting up the handler for the GET endpoints.
    Spark.get("ENDPOINT", null);

    // Init/initializing Spark
    Spark.init();
    Spark.awaitInitialization();
    // Printing out to the console that the server has been started (helpful to the user)
    System.out.println("Server started.");
  }

}
