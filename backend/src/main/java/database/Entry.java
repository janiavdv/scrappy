package database;

public class Entry {

  private String title;
  private String caption;
  private String tag;
  private String imageLink;
  private String time;
  private String entryID;
  private String user;


  public Entry() {

  }

  public void setTitle(String title) {
    this.title = title;
  }

  public void setCaption(String caption) {
    this.caption = caption;
  }

  public void setTag(String tag) {
    this.tag = tag;
  }

  public void setImageLink(String imageLink) {
    this.imageLink = imageLink;
  }

  public void setTime(String time) {
    this.time = time;
  }

  public void setEntryID(String entryID) {
    this.entryID = entryID;
  }

  public void setUser(String username) {
    this.user = username;
  }

}
