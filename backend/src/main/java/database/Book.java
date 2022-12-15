package database;

import java.util.Collections;
import java.util.List;
// Above we have the import statements.

/**
 * This is the Book class.
 */
public class Book {

  // Here we have the instance variables we need for the Book class.
  private String title;
  private List<Entry> entries;
  private String bookID;
  private String date;
  private String nyt;
  private String quote;

  /**
   * This is the constructor for our Book class. In it, we initialize our entries instance variables
   * to an empty list.
   */
  public Book() {
    this.entries = Collections.emptyList();
  }

  /**
   * This is a public setter method which takes in a String representing the title, and sets that
   * equal to the title instance variable.
   *
   * @param title a String representing the Book's title
   */
  public void setTitle(String title) {
    this.title = title;
  }

  /**
   * This is a public setter method which takes in a String representing the bookID, and sets that
   * equal to the bookID instance variable.
   *
   * @param bookID a String representing the Book's bookID
   */
  public void setBookID(String bookID) {
    this.bookID = bookID;
  }

  /**
   * This is a public setter method which takes in a String representing the data, and sets that
   * equal to the date instance variable.
   *
   * @param date a String representing the Book's date
   */
  public void setDate(String date) {
    this.date = date;
  }

  /**
   * This is a public setter method which takes in a String representing the nyt, and sets that
   * equal to the nyt instance variable.
   *
   * @param nyt a String representing the Book's nyt
   */
  public void setNyt(String nyt) {
    this.nyt = nyt;
  }

  /**
   * This is a public setter method which takes in a String representing the quote, and sets that
   * equal to the quote instance variable.
   *
   * @param quote a String representing the book's quote
   */
  public void setQuote(String quote) {
    this.quote = quote;
  }

}
