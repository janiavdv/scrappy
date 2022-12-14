import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BookObject from "./BookObject";
import Page, { PageProps } from "./pagecomponent";
export interface BookProps {
    setBook: Dispatch<SetStateAction<BookObject>>
    bookObject: BookObject
}

async function fetchAPIData(url: string, datapoint: string) {
    const data = await fetch(url);
    const json = await data.json();

    switch(datapoint) {
        case "headline":
            return json.headline
        case "quote":
            return json.quote
        case "author":
            return json.author
        default:
            return ""
    }
}

// The HTML for a Book.
export function Book({ bookObject, setBook }: BookProps) {
    const [nytdata, setData] = useState<string | undefined>(undefined)
    useEffect(() => {
        fetchAPIData('http://localhost:3232/nyt', "headline").then(data => setData(data))
    })
    const [quotedata, setData2] = useState<string | undefined>(undefined)
    useEffect(() => {
        fetchAPIData('http://localhost:3232/quote', "quote").then(data => setData2(data))
    })
    const [quoteauthordata, setData3] = useState<string | undefined>(undefined)
    useEffect(() => {
        fetchAPIData('http://localhost:3232/quote', "author").then(data => setData3(data))
    })

    const quote: string = "\"" + quotedata + "\"" + " -" + quoteauthordata;

    if (bookObject.quote == "") {
        let nyt : string;
        if (nytdata != null) {
            nyt = nytdata
        } else {
            nyt = "No article found."
        }
        const id : number = new Date().getTime();
        const bookToAdd : BookObject = {
            title: "Today's Book",
            bookID: id.toString(),
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
            quote: quote,
            nyt: nyt,
            entries: []
        }
        // addBookToDataBase()
        http://localhost:3232/database?command=ADD&type=BOOK&title=title&bookID=1&date=12/13&nyt=news!&quote=%22hello%22&username=jvd
        setBook(bookToAdd)
    }

    return (
        <div className="book">
            <div className="book-start">
                <hr className="book-top"></hr>
                <h3>Today's Book</h3>
                <h4>{bookObject.date}</h4>
                <p><b>Today's NYT Headline:</b> {bookObject.nyt}</p>
                <p><b>Today's Quote of the Day:</b> "{bookObject.quote}"</p>
            </div>
            {bookObject.entries.map((page) => (
                <Page title={page.title} body={page.body} img={page.img} key={page.title} hashtag={page.hashtag} />
            ))}
        </div>
    );
}
