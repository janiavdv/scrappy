package utils;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

/**
 * Class responsible for holding the vectorizing algorithms.
 */
public class VectorUtil {

  public static HashMap<String, ArrayList<Double>> wordEmbeddings;

  /**
   * Called upon server instantiation, works to generate the stored map of word to vector
   * embeddings.
   * @throws IOException
   */
  public static void generateEmbeddings()
      throws IOException {
    String filePath = "src/data/glove.6b.50d.txt";
    HashMap<String, ArrayList<Double>> embeddings = new HashMap<>();

    BufferedReader modelInput = new BufferedReader(new FileReader(filePath));
    String line = modelInput.readLine();
    long time = System.currentTimeMillis();
    double count = 0;
    // We go through every line, separating the word and the list of double vectors.
    while (line != null) {
      // Separating the values.
      ArrayList<String> brokenLine = new ArrayList<>(List.of(line.split(" ")));
      String word = brokenLine.remove(0); // Taking out the word.
      ArrayList<Double> vectors = new ArrayList<>();
      for (int i = 0; i < brokenLine.size(); i++)  {
        vectors.add(Double.valueOf(brokenLine.get(i))); // creating a list of the vectors for word
      }
      embeddings.put(word, vectors); // mapping it into our embedding map.
      count++;
      System.out.println(count / 400000);
      line = modelInput.readLine();
    }
    System.out.println(System.currentTimeMillis() - time);
    wordEmbeddings = embeddings;
  }


  /**
   * Algorithm to take in all the user's tags and the posts that can be shown, and generates an orderedlist
   * of the entries to show on the gallery page.
   * @param tags the user's interests
   * @param tagToEntries all available posts
   * @return and ordered list of the posts.
   */
  public static ArrayList<Object> generatePostList(ArrayList<String> tags, HashMap<String, ArrayList<Object>> tagToEntries) {
    ArrayList<Object> orderedList = new ArrayList<>();
    HashMap<String, ArrayList<Double>> stringToVector = new HashMap<>();
    HashMap<String, ArrayList<Double>> stringToUnaverageredScore = new HashMap<>();
    HashMap<Double, String> scoreToString = new HashMap<>();


    // We get the vector for each word, and if it isn't in the dataset, we just dont associate it.
    for (String t : tagToEntries.keySet()) {
      ArrayList<Double> tagVector = getVector(t);

      if (tagVector != null) {
        stringToVector.put(t, tagVector);
      }
    }

    for (String tag : tags) {
      ArrayList<Double> tagVector = getVector(tag);
      if (tagVector != null) {
        for (String s: stringToVector.keySet()) {
          // Getting the score similarity between each user tag, and the word associated with each post.
          Double score = cosineSimilarity(tagVector, stringToVector.get(s));
          if (stringToUnaverageredScore.containsKey(s)) {
            stringToUnaverageredScore.get(s).add(score);
          } else {
            ArrayList<Double> scores = new ArrayList<>();
            scores.add(score);
            stringToUnaverageredScore.put(s, scores);
          }
        }
      }
    }

    for (String s : stringToUnaverageredScore.keySet()) {
//      https://stackoverflow.com/questions/10791568/calculating-average-of-an-array-list
      // We take the lists of scores and average them across all the tags.
      double averageScore = stringToUnaverageredScore.get(s).stream().mapToDouble(d -> d).average().orElse(0.0);
      scoreToString.put(averageScore, s);
    }

    // We sort this based on how good a score is.
    ArrayList<Double> sortedScores = new ArrayList<>(scoreToString.keySet());
    Collections.sort(sortedScores);
    Collections.reverse(sortedScores);

    // Push it through the list.
    for (Double score: sortedScores) {
      orderedList.add(tagToEntries.get(scoreToString.get(score)));
    }
    return orderedList;
  }


  /**
   * Method which provides an embedding vector for a given word, which we can then compare.
   * @param word string to which we want a vector for
   * @return the vector of that word
   */
  public static ArrayList<Double> getVector(String word) {
    return (wordEmbeddings.get(word));
  }


  /**
   * Method which calculates the cosine similarity between two words (how similar they are).
   * @param vectorA first word vector
   * @param vectorB second word vector
   * @return the similarity score between them.
   */
  //https://stackoverflow.com/questions/520241/how-do-i-calculate-the-cosine-similarity-of-two-vectors
  public static Double cosineSimilarity(ArrayList<Double> vectorA, ArrayList<Double> vectorB) {
    double dotProduct = 0.0;
    double normA = 0.0;
    double normB = 0.0;
    // Calculating the dot product over the roots of the normals.
    for (int i = 0; i < vectorA.size(); i++) {
      dotProduct += vectorA.get(i) * vectorB.get(i);
      normA += Math.pow(vectorA.get(i), 2);
      normB += Math.pow(vectorB.get(i), 2);
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB)); // A score, 1 is a perfect match, 0 no similarity.
  }
}
