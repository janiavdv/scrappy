import Friend from "../gencomponents/friendcomponent";
import BookObject from "../interfaces/BookObject";
import Entry from "../interfaces/EntryObject";
import User from "../interfaces/user";

export async function getQuery(
  type: string,
  ref: string,
  value: string
): Promise<User | null> {
  const response: any = await fetch(
    `http://localhost:3232/database?command=QUERY&type=${type}&${ref}=${value}`
  );
  const json = await response.json();
  if (json.result === "success") {
    return json.User;
  } else {
    return null;
  }
}

export async function getBookListFromDatabase(
  username: string
): Promise<BookObject[]> {
  const usr: User | null = await getQuery("USERNAME", "username", username);

  if (usr != null) {
    return usr.books;
  } else {
    return [];
  }
}

export async function addUserToDatabase(user: User) {
  await fetch(
    `http://localhost:3232/database?command=ADD&type=USER&email=${user.email}&username=${user.username}&name=${user.name}&profilePic=${user.profilePic}&tags=${user.tags}`
  );
}

export async function addEntryToDatabase(
  entry: Entry,
  book: BookObject,
  username: string
) {
  await fetch(
    `http://localhost:3232/database?command=ADD&type=ENTRY&title=${entry.title}&user=${entry.user}&caption=${entry.caption}&time=${entry.time}&date=${entry.date}&tag=${entry.tag}&image=${entry.imageLink}&entryID=${entry.entryID}&public=${entry.publicized}`
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
  if (json.result === "success") {
    console.log(json);
    return json.Entry;
  } else {
    return null;
  }
}

export async function removeFriendFromDatabase(
  user: User,
  friendUsername: string,
  request: boolean
) {
  await fetch(
    `http://localhost:3232/database?command=REMOVE-FRIEND&username=${user.username}&removedFriend=${friendUsername}&isRequest=${request}`
  );
}

export async function addNewFriend(user: User, friendUsername: string) {
  await fetch(
    `http://localhost:3232/database?command=UPDATE&type=NEW-FRIEND&username=${user.username}&newFriend=${friendUsername}`
  );
}

export async function addNewFriendRequest(user: User, friendUsername: string) {
  await fetch(
    `http://localhost:3232/database?command=UPDATE&type=FRIEND-REQUEST&username=${user.username}&friendRequest=${friendUsername}`
  );
}

export async function grabFriends(
  user: User,
  requests: boolean
): Promise<Friend[]> {
  let userdata = await getQuery("USERNAME", "username", user.username);

  if (userdata != null) {
    let lst: string[] = [];
    if (requests) {
      lst = userdata.friendsRequest;
    } else {
      lst = userdata.friendsList;
    }

    let fComponentList: Friend[] = [];
    for (let i = 0; i < lst.length; i++) {
      let friendInfo = await getQuery("USERNAME", "username", lst[i]);
      if (friendInfo != null) {
        let fComponent: Friend = {
          username: friendInfo.username,
          image: friendInfo.profilePic,
        };
        fComponentList.push(fComponent);
      }
    }
    console.log(fComponentList);
    return fComponentList;
  } else {
    return [];
  }
}

export async function grabOrderedFriendPosts(
  lst: Friend[]
): Promise<Entry[] | null> {
  let unorderedList: Entry[] = [];

  for (let i = 0; i < lst.length; i++) {
    let friendBookList = await getBookListFromDatabase(lst[i].username);
    for (let j = 0; j < friendBookList.length; j++) {
      if (
        friendBookList[j].date ===
        new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      ) {
        let todayEntries: string[] = friendBookList[i].entries;
        for (let k = 0; k < todayEntries.length; k++) {
          let entry: Entry = await getEntryOffID(todayEntries[k]);
          unorderedList.push(entry);
        }
        break;
      }
    }
  }

  let orderedList: Entry[] = unorderedList.sort(function (a, b) {
    return a.time.localeCompare(b.time);
  });

  return orderedList;
}
