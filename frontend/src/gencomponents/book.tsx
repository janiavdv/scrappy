import { Dispatch, SetStateAction } from "react";
import { addBookToDatabase } from "../utils/dbutils";
import BookObject from "./BookObject";
import Page from "./pagecomponent";
import User from "./user";

export interface BookProps {
  setBook: Dispatch<SetStateAction<BookObject | null>>;
  bookObject: BookObject | null;
  user: User;
}

export async function createDefaultBook(user: User): Promise<BookObject> {
  let dataArr = await setAllData();
  const id: number = new Date().getTime();
  const date: string = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const bookToAdd: BookObject = {
    title: "Today's Book, " + date,
    bookID: id.toString(),
    date: date,
    quote: dataArr[1] + " -" + dataArr[2],
    nyt: dataArr[0],
    entries: [],
  };
  user.books.push(bookToAdd);
  addBookToDatabase(bookToAdd, user);
  return bookToAdd;
}

async function fetchAPIData(url: string, datapoint: string) {
  const data = await fetch(url);
  const json = await data.json();

  switch (datapoint) {
    case "headline":
      return json.headline;
    case "quote":
      return json.quote;
    case "author":
      return json.author;
    default:
      return "";
  }
}

async function setAllData() {
  let nyt: string = await fetchAPIData("http://localhost:3232/nyt", "headline");
  let quote: string = await fetchAPIData(
    "http://localhost:3232/quote",
    "quote"
  );
  let author: string = await fetchAPIData(
    "http://localhost:3232/quote",
    "author"
  );
  return [nyt, quote, author];
}

// The HTML for a Book.
export function Book({ bookObject }: BookProps) {
  console.log(bookObject);

  if (bookObject != null) {
    const TEXT_book_description = `This is today's book. Here you can view your 
    entries from the day and upload new photos. Today's date is ${bookObject.date} 
    and your headline is ${bookObject.nyt}. Today's quote of the day is 
    ${bookObject.quote}.`;

    return (
      <div className="book">
        <div className="book-start">
          <hr className="book-top" aria-label={TEXT_book_description}></hr>
          <h3>{"Today's Book, " + bookObject.date}</h3>
          <h4>{bookObject.date}</h4>
          <p>
            <b>Today's NYT Headline:</b> {bookObject.nyt}
          </p>
          <p>
            <b>Today's Quote of the Day:</b> "{bookObject.quote}"
          </p>
        </div>
        {bookObject.entries.map((page) => (
          <Page id={page} key={page} />
        ))}
      </div>
    );
  } else {
    return null;
  }
}
