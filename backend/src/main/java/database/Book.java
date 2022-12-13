package database;

import java.util.Collections;
import java.util.List;

public class Book {

  private String title;
  private List<String> entryIDs;
  private String bookID;
  private String date;

  public Book() {
    this.entryIDs = Collections.emptyList();
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public void setBookID(String bookID) {
    this.bookID = bookID;
  }

  public void setDate(String date) {
    this.date = date;
  }

}
