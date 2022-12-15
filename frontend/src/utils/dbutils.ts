import BookObject from "../gencomponents/BookObject";
import Entry from "../gencomponents/EntryObject";
import User from "../gencomponents/user";

export async function getQuery(
  type: string,
  ref: string,
  value: string
): Promise<User | null> {
  const response: any = await fetch(
    `http://localhost:3232/database?command=QUERY&type=${type}&${ref}=${value}`
  );
  const json = await response.json();
  if (json.result == "success") {
    return json.User;
  } else {
    return null;
  }
}

export async function getBookListFromDatabase( user: User ): Promise<BookObject[]> {
  const usr: User | null = await getQuery(
    "USERNAME",
    "username",
    user.username
  );

  if (usr != null) {
    return usr.books;
  } else {
    return [];
  }
}

export async function addUserToDatabase(user: User) {
  const response = await fetch(
    `http://localhost:3232/database?command=ADD&type=USER&email=${user.email}&username=${user.username}&name=${user.name}&profilePic=${user.profilePic}&tags=${user.tags}`
  );
}

export async function addEntryToDatabase(
  entry: Entry,
  book: BookObject,
  username: string
) {
  await fetch(
    `http://localhost:3232/database?command=ADD&type=ENTRY&title=${entry.title}&user=${entry.user}&caption=${entry.caption}&time=${entry.time}&date=${entry.date}&tag=${entry.tag}&image=${entry.imageLink}&entryID=${entry.entryID}`
  );

  console.log(
    `http://localhost:3232/database?command=UPDATE&type=BOOK&bookID=${book.bookID}&entryID=${entry.entryID}`
  );
  await fetch(
    `http://localhost:3232/database?command=UPDATE&type=BOOK&bookID=${book.bookID}&entryID=${entry.entryID}&username=${username}`
  );
}

export async function addBookToDatabase(book: BookObject, user: User) {
  console.log(book);
  await fetch(
    `http://localhost:3232/database?command=ADD&type=BOOK&title=${book.title}&nyt=${book.nyt}&date=${book.date}&quote=${book.quote}&bookID=${book.bookID}&username=${user.username}`
  );
}

export async function getEntryOffID(entryID: string) {
  let response = await fetch(
    `http://localhost:3232/database?command=QUERY&type=ENTRY&entryID=${entryID}`
  );
  const json = await response.json();
  console.log(json.result);
  if (json.result == "success") {
    console.log(json);
    return json.Entry;
  } else {
    return null;
  }
}
