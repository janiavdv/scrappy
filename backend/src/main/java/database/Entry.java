package database;

/**
 * This is a class representing the Entry.
 */
public class Entry {

  // Here we instantiate the instance variables used in/for the Entry class.
  private String title;
  private String caption;
  private String tag;
  private String imageLink;
  private String time;
  private String date;
  private String entryID;
  private String user;

  /**
   * This is the constructor for the Entry class (we don't actually need to do anything in it, more
   * for formality purposes).
   */
  public Entry() {
  }

  /**
   * This is a public setter method which takes in a String representing the title, and sets that
   * equal to the instance variable representing the title.
   *
   * @param title a String representing the entry's title
   */
  public void setTitle(String title) {
    this.title = title;
  }

  /**
   * This is a public setter method which takes in a String representing the caption, and sets that
   * equal to the instance variable representing the caption.
   *
   * @param caption a String representing the entry's caption
   */
  public void setCaption(String caption) {
    this.caption = caption;
  }

  /**
   * This is a public setter method which takes in a String representing the tag, and sets that
   * equal to the instance variable representing the tag.
   *
   * @param tag a String representing the entry's tag
   */
  public void setTag(String tag) {
    this.tag = tag;
  }

  /**
   * This is a public setter method which takes in a String representing the imageLink, and sets
   * that equal to the instance variable representing the imageLink.
   *
   * @param imageLink a String representing the entry's userLink
   */
  public void setImageLink(String imageLink) {
    this.imageLink = imageLink;
  }

  /**
   * This is a public setter method which takes in a String representing the time, and sets that
   * equal to the instance variable representing the time.
   *
   * @param time a String representing the entry's time
   */
  public void setTime(String time) {
    this.time = time;
  }

  /**
   * This is a public setter method which takes in a String representing the data, and sets that
   * equal to the instance variable representing the date.
   *
   * @param date a String representing the entry's date
   */
  public void setDate(String date) {
    this.date = date;
  }

  /**
   * This is a public setter method which takes in a String representing the entryID, and sets that
   * equal to the instance variable representing the entryID.
   *
   * @param entryID a String representing the entry's entryID
   */
  public void setEntryID(String entryID) {
    this.entryID = entryID;
  }

  /**
   * This is a public setter method which takes in a String representing the username, and sets that
   * equal to the instance variable representing the username.
   *
   * @param username a String representing the entry's username
   */
  public void setUser(String username) {
    this.user = username;
  }

}
