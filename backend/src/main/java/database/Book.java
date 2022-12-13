package database;

import java.util.Collections;
import java.util.List;

public class Book {

  private String title;
  private List<Entry> entries;
  private String bookID;
  private String date;
  private String nyt;
  private String quote;

  public Book() {
    this.entries = Collections.emptyList();
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

  public void setNyt(String nyt) {
    this.nyt = nyt;
  }

  public void setQuote(String quote) {
    this.quote = quote;
  }

}
