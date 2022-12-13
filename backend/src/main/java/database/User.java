package database;

import java.util.Collections;
import java.util.List;

public class User {

  private String email;
  private String username;
  private String name;
  private String profilePic;
  private List<String> tags;
  private List<Entry> entries;
  private List<String> friendsRequest;
  private List<String> friendsList;
  private List<Book> books;

  public User() {
    this.entries = Collections.emptyList();
    this.friendsRequest = Collections.emptyList();
    this.friendsList = Collections.emptyList();
    this.books = Collections.emptyList();
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setProfilePic(String profilePic) {
    this.profilePic = profilePic;
  }

  public void setTags(List<String> tags) {
    this.tags = tags;
  }

}
