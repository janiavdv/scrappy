import Entry from "./EntryObject";
import { PageProps } from "./pagecomponent";

export default interface BookObject {
    title: string,
    bookID: string,
    date: string,
    quote: string,
    nyt: string,
    entries: string[]
}