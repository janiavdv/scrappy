import database.MongoDB;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.jupiter.api.BeforeAll;
import server.Server;
import spark.Spark;

public class AlgorithmTest {
  /**
   * Set the Spark port number. Remove the logging spam during tests.
   */
//  @BeforeAll
//  public static void setupServer() {
//    Server.main();
//    Spark.port(0);
//    Logger.getLogger("").setLevel(Level.WARNING); // empty name = root logger
//
//    testMongoDB = new MongoDB();
//    testMongoDB.setDatabase("mockDatabase");
//    Server.setMyDatabase(testMongoDB);
//  }
}
