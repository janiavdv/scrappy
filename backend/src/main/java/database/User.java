package database;

import java.util.Collections;
import java.util.List;
// Notice our import statements above.

/**
 * This is a class representing our User.
 */
public class User {

  // Here we instantiate our private instance variables for the User class.
  private String email;
  private String username;
  private String name;
  private String profilePic;
  private List<String> tags;
  private List<String> friendsRequest;
  private List<String> friendsList;
  private List<Book> books;

  /**
   * This is the constructor of the User class. Inside it, we initialize some of the instance
   * variables declared above.
   */
  public User() {
    this.friendsRequest = Collections.emptyList();
    this.friendsList = Collections.emptyList();
    this.books = Collections.emptyList();
  }

  /**
   * This is a public setter method which takes in a parameter String representing an email, and
   * sets our email instance variable equal to that email.
   *
   * @param email a String representing the User's email
   */
  public void setEmail(String email) {
    this.email = email;
  }

  /**
   * This is a public setter method which takes in a parameter String representing a username, and
   * sets our username instance variable equal to that username.
   *
   * @param username a String representing the User's username
   */
  public void setUsername(String username) {
    this.username = username;
  }

  /**
   * This is a public setter method which takes in a parameter String representing a name, and sets
   * our name instance variable equal to that name.
   *
   * @param name a String representing the User's name
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * This is a public setter method which takes in a parameter String representing a profilePic, and
   * sets our profilePic instance variable equal to that profilePic.
   *
   * @param profilePic a String representing the User's profilePic
   */
  public void setProfilePic(String profilePic) {
    this.profilePic = profilePic;
  }

  /**
   * This is a public setter method which takes in a parameter List<String> representing tags, and
   * sets our tags instance variable equal to those tags.
   *
   * @param tags a List<String> representing the User's tags
   */
  public void setTags(List<String> tags) {
    this.tags = tags;
  }

}
