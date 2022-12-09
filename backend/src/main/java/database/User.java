package database;

import java.util.List;

public class User {

  private String email;
  private String username;
  private String name;
  private String profilePic;
  private List<String> tags;
  private List<Entry> entries;
  private List<String> friendsList;
  private List<Book> books;

  public User() {

  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getEmail() {
    return this.email;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getUsername() {
    return this.username;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getName() {
    return this.name;
  }

  public void setProfilePic(String profilePic) {
    this.profilePic = profilePic;
  }

  public String getProfilePic() {
    return this.profilePic;
  }

  public void setTags(List<String> tags) {
    this.tags = tags;
  }

  public List<String> getTags() {
    return this.tags;
  }

  public void setEntries(List<Entry> entries) {
    this.entries = entries;
  }
  public List<Entry> getEntries() {
    return this.entries;
  }

  public void setFriendsList(List<String> friendsList) {
    this.friendsList = friendsList;
  }

  public List<String> getFriendsList() {
    return this.friendsList;
  }

  public void setBooks(List<Book> books) {
    this.books = books;
  }

  public List<Book> getBooks() {
    return this.books;
  }

}
