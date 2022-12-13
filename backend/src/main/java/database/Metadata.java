package database;

public class Metadata {

  private String date;
  private String nyt;
  private String horoscope;
  private String quote;

  public Metadata(String date) {
    this.date = date;
  }

  public void setNYT(String nyt) {
    this.nyt = nyt;
  }

  public void setHoroscope(String horoscope) {
    this.horoscope = horoscope;
  }

  public void setQuote(String quote) {
    this.quote = quote;
  }

}
