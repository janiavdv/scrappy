import Book from "./BookObject";
import Entry from "./EntryObject";

export default interface User {
  name: string;
  email: string;
  username: string;
  profilePic: string;
  tags: string[];
  books: Book[];
  entries: Entry[];
  friendsList: string[];
  friendsRequest: string[];
}
