package utils;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

public class VectorUtil {

  public static HashMap<String, ArrayList<Double>> wordEmbeddings;

  public static void generateEmbeddings()
      throws IOException {
    String filePath = "src/data/glove.6b.50d.txt";
    HashMap<String, ArrayList<Double>> embeddings = new HashMap<>();

    BufferedReader modelInput = new BufferedReader(new FileReader(filePath));
    String line = modelInput.readLine();
    long time = System.currentTimeMillis();
    double count = 0;
    while (line != null) {
      ArrayList<String> brokenLine = new ArrayList<>(List.of(line.split(" ")));
      String word = brokenLine.remove(0);
      ArrayList<Double> vectors = new ArrayList<>();
      for (int i = 0; i < brokenLine.size(); i++)  {
//        System.out.println(i);
        vectors.add(Double.valueOf(brokenLine.get(i)));
      }
      embeddings.put(word, vectors);
      count++;
      System.out.println(count / 400000);
      line = modelInput.readLine();
    }
    System.out.println(System.currentTimeMillis() - time);
    wordEmbeddings = embeddings;
  }

  public static ArrayList<Object> generatePostList(ArrayList<String> tags, HashMap<String, ArrayList<Object>> tagToEntries) {
    ArrayList<Object> orderedList = new ArrayList<>();
    HashMap<String, ArrayList<Double>> stringToVector = new HashMap<>();
    HashMap<String, ArrayList<Double>> stringToUnaverageredScore = new HashMap<>();
    HashMap<Double, String> scoreToString = new HashMap<>();


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
          Double score = cosineSimilarity(tagVector, stringToVector.get(s));
//          System.out.println("Vector score: " + tag + " " + s + " :" + score.toString());
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

//    System.out.println(stringToUnaverageredScore);

    for (String s : stringToUnaverageredScore.keySet()) {
//      https://stackoverflow.com/questions/10791568/calculating-average-of-an-array-list

      double averageScore = stringToUnaverageredScore.get(s).stream().mapToDouble(d -> d).average().orElse(0.0);
      scoreToString.put(averageScore, s);
    }

    ArrayList<Double> sortedScores = new ArrayList<>(scoreToString.keySet());
    Collections.sort(sortedScores);
    Collections.reverse(sortedScores);

    for (Double score: sortedScores) {
      orderedList.add(tagToEntries.get(scoreToString.get(score)));
    }
    return orderedList;
  }


  public static ArrayList<Double> getVector(String word) {
    return (wordEmbeddings.get(word));
  }

  //https://stackoverflow.com/questions/520241/how-do-i-calculate-the-cosine-similarity-of-two-vectors
  public static Double cosineSimilarity(ArrayList<Double> vectorA, ArrayList<Double> vectorB) {
    double dotProduct = 0.0;
    double normA = 0.0;
    double normB = 0.0;
    for (int i = 0; i < vectorA.size(); i++) {
      dotProduct += vectorA.get(i) * vectorB.get(i);
      normA += Math.pow(vectorA.get(i), 2);
      normB += Math.pow(vectorB.get(i), 2);
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }
}
