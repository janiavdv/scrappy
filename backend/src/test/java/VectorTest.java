import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.util.ArrayList;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import utils.VectorUtil;

@TestInstance(Lifecycle.PER_CLASS)
public class VectorTest {

  @BeforeAll
  public void setup() throws IOException {
    VectorUtil.generateEmbeddings();
  }
  /**
   * Tests vectorization and cosine scores
   * @throws IOException
   */
  @Test
  public void testScoring() throws IOException {

    ArrayList<Double> catVectors = VectorUtil.getVector("cat");
    ArrayList<Double> felineVectors = VectorUtil.getVector("feline");
    Double cattyScore = VectorUtil.cosineSimilarity(catVectors, felineVectors);

    ArrayList<Double> irrelevantVectors = VectorUtil.getVector("book");

    Double badScore = VectorUtil.cosineSimilarity(catVectors, irrelevantVectors);

    assertTrue(cattyScore > badScore);
  }


  /**
   * Tests vectorization and cosine scores on the same word.
   * @throws IOException
   */
  @Test
  public void testScoringSame() throws IOException {
    ArrayList<Double> catVectors = VectorUtil.getVector("cat");
    Double cattyScore = VectorUtil.cosineSimilarity(catVectors, catVectors);

    assertTrue(cattyScore == 1);
  }
}
