package database;

import java.util.List;

public class User {

  private String email;
  private String userName;
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

  public void setUserName(String userName) {
    this.userName = this.userName;
  }

  public String getUserName() {
    return this.userName;
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
