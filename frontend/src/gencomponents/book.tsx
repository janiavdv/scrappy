import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { addBookToDatabase, getEntryOffID } from "../utils/dbutils";
import BookObject from "./BookObject";
import Entry from "./EntryObject";
import Page from "./pagecomponent";
import User from "./user";

export interface BookProps {
    setBook: Dispatch<SetStateAction<BookObject | null>>
    bookObject: BookObject | null
    user: User
}

export async function createDefaultBook(user: User): Promise<BookObject> {
    let dataArr = await setAllData();
    const id: number = new Date().getTime();
    const bookToAdd: BookObject = {
        title: "Today's Book",
        bookID: id.toString(),
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
        quote: dataArr[1] + " -" + dataArr[2],
        nyt: dataArr[0],
        entries: []
    }
    user.books.push(bookToAdd)
    addBookToDatabase(bookToAdd, user)
    return (bookToAdd)
}

async function fetchAPIData(url: string, datapoint: string) {
    const data = await fetch(url);
    const json = await data.json();

    switch (datapoint) {
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

async function setAllData() {
    let nyt: string = await fetchAPIData('http://localhost:3232/nyt', "headline")
    let quote: string = await fetchAPIData('http://localhost:3232/quote', "quote")
    let author: string = await fetchAPIData('http://localhost:3232/quote', "author")
    return ([nyt, quote, author])
}

// The HTML for a Book.
export function Book({ bookObject }: BookProps) {
    const [rendered, setRendered] = useState<boolean>(false);
    const [pages, setPages] = useState<Entry[]>([])
    console.log(bookObject)

    useEffect(() => {
        if (bookObject != null && !rendered) {
            for (let i = 0; i < bookObject.entries.length; i++) {
                getEntryOffID(bookObject.entries[i]).then(page => setPages([...pages, page]))
            }
            console.log('i should be rendering')
            setRendered(true)
        }
    })

    if (bookObject != null && rendered) {

    return (
            <div className="book">
                <div className="book-start">
                    <hr className="book-top"></hr>
                    <h3>Today's Book</h3>
                    <h4>{bookObject.date}</h4>
                    <p><b>Today's NYT Headline:</b> {bookObject.nyt}</p>
                    <p><b>Today's Quote of the Day:</b> "{bookObject.quote}"</p>
                </div>
                {pages.map((page) => (

                    <Page title={page.title} body={page.caption} img={page.imageLink} key={page.title} hashtag={page.tag} />
                ))}
            </div>
        );
    } else {
        return (null)
    }
}
