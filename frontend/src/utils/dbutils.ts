import BookObject from "../gencomponents/BookObject";
import Entry from "../gencomponents/EntryObject";
import User from "../gencomponents/user"

export async function getQuery(type: string, ref: string, value: string) : Promise<User | null> {
    const response: any = await fetch(`http://localhost:3232/database?command=QUERY&type=${type}&${ref}=${value}`);
    const json = await response.json();
    console.log(json.result)
    if (json.result == "success") {
        console.log(json)
        return json.User;
    } else {
        return null;
    }
}

export async function addUserToDatabase(user: User) {
    const response = await fetch(`http://localhost:3232/database?command=ADD&type=USER&email=${user.email}&username=${user.username}&name=${user.name}&profilePic=${user.profilePic}&tags=${user.tags}`);
}

export async function addEntryToDatabase(entry : Entry, book : BookObject) {
    await fetch(`http://localhost:3232/database?command=ADD&type=ENTRY&title=${entry.title}&user=${entry.user}&caption=${entry.caption}&time=${entry.time}&date=${entry.date}&tag=${entry.tag}&image=${entry.imageLink}&entryID=${entry.entryID}`);

    console.log(`http://localhost:3232/database?command=UPDATE&type=BOOK&bookID=${book.bookID}&entryID=${entry.entryID}`)
    await fetch(`http://localhost:3232/database?command=UPDATE&type=BOOK&bookID=${book.bookID}&entryID=${entry.entryID}`);
}

export async function addBookToDatabase(book : BookObject, user : User) {
    console.log(book)
    await fetch(`http://localhost:3232/database?command=ADD&type=BOOK&title=${book.title}&nyt=${book.nyt}&date=${book.date}&quote=${book.quote}&bookID=${book.bookID}&username=${user.username}`);
}
