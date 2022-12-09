package database;

import java.util.List;

public class Entry {

  private String bookName;
  private String imageLink;
  private String caption;
  private String date;
  private String tag;

  public Entry() {

  }

  // This is where we should parse the link and find what the book name should be?
  public void setBookName(String bookName) {
    this.bookName = bookName;
  }

  public String getBookName() {
    return this.bookName;
  }

  public void setImageLink(String imageLink) {
    this.imageLink = imageLink;
  }

  public String getImageLink() {
    return this.imageLink;
  }

  public void setCaption(String caption) {
    this.caption = caption;
  }

  public String getCaption() {
    return this.caption;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public String getDate() {
    return this.date;
  }

  public void setTag(String tag) {
    this.tag = tag;
  }

}
