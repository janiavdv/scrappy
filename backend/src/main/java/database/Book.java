package database;

import java.util.Collections;
import java.util.List;

public class Book {

  private String title;
  private List<String> images;

  public Book() {
    this.images = Collections.emptyList();
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getTitle() {
    return this.title;
  }

  public void addImage(String image) {
    this.images.add(image);
  }

}
