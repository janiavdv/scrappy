import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Page, { PageProps } from "./pagecomponent";
export interface BookProps {
    pages: PageProps[],
    setPages: Dispatch<SetStateAction<PageProps[]>>
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
export function Book({ pages, setPages }: BookProps) {
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

    return (
        <div className="book">
            <div className="book-start">
                <hr className="book-top"></hr>
                <h3>Today's Book</h3>
                <h4>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</h4>
                <p>Horoscope:  Although you may not feel quite so physically attracted to your love interest as usual, you are likely to somehow strengthen the bond between you and urge you to renew your sense of commitment. You will feel extremely close on an emotional level, and because of this will find that you become naturally closer on other levels; so, don't let this temporary phase worry you.</p>
                <p><b>Today's NYT Headline:</b> {nytdata}</p>
                <p><b>Today's Quote of the Day:</b> "{quotedata}" -{quoteauthordata}</p>
            </div>
            {pages.map((page) => (
                <Page title={page.title} body={page.body} img={page.img} key={page.title} hashtag={page.hashtag} />
            ))}
        </div>
    );
}