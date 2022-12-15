import { Dispatch, SetStateAction, useState } from "react";
import { useLocation } from "react-router-dom";
import ControlledInput from "../gencomponents/controlledinput";
import Header from "../gencomponents/header";
import Footer from "../gencomponents/footer";
import User from "../interfaces/user";
import { getQuery } from "../utils/dbutils";
import FriendComponent, {
  FriendComponentReact,
  FriendComponentSearch,
  FriendListComponent,
  grabFriendComponents,
} from "../gencomponents/friendcomponent";
import { useEffect } from "react";

const TEXT_user_posts = `Here you can view your friends' posts and search.`;
const TEXT_posts_button = `Click here to see posts!`;
const TEXT_search_button = `Click here to search for books!`;

function Posts() {
  return <p>these are all your friends' posts</p>;
}

interface SearchModalProps {
  display: boolean;
  setDisplay: Dispatch<SetStateAction<boolean>>;
  searcher: User;
}

function SearchModal({ display, setDisplay, searcher }: SearchModalProps) {
  const [searchValue, setSearchValue] = useState<string>(""); // For controlling the body textbox.
  const [searchedFriend, setSearchedFriend] = useState<User | null>(null);
  const [friendStatus, setFriendStatus] = useState<string>();

  if (!display) {
    return null;
  }

  return (
    <div id="modal">
      <div id="log-modal">
        <h3>Enter the friend you are looking for's full username!</h3>
        <label htmlFor="search-input">Search:</label>
        <ControlledInput
          value={searchValue}
          setValue={setSearchValue}
          ariaLabel={""}
          spaces={false}
          id="search-input"
        />
        <button
          type="submit"
          value="Post"
          onClick={async () => {
            const user: User | null = await getQuery(
              "USERNAME",
              "username",
              searchValue
            );
            const updatedSearcher: User | null = await getQuery(
              "USERNAME",
              "username",
              searcher.username
            );

            if (updatedSearcher != null && user != null) {
              if (updatedSearcher.friendsList.includes(user.username)) {
                setFriendStatus("Unadd Friend");
              } else if (
                updatedSearcher.friendsRequest.includes(user.username)
              ) {
                setFriendStatus("Remove Friend Request");
              } else {
                setFriendStatus("Request Friend");
              }
              setSearchedFriend(user);
            } else {
              setSearchedFriend(null);
            }
          }}
        >
          Search
        </button>
        <hr></hr>
        <div id="searched-friend">
          {searchedFriend ? (
            <div className="retrieved-friend-query">
              <FriendComponentSearch
                username={searchedFriend.username}
                image={searchedFriend.profilePic}
              />
              <button>{friendStatus}</button>
            </div>
          ) : (
            <p>No such friend found.</p>
          )}
        </div>
        <hr></hr>
        <button
          className="close-button"
          onClick={() => {
            setDisplay(false);
            setSearchValue("");
            setSearchedFriend(null);
          }}
        >
          {" "}
          Close
        </button>
      </div>
    </div>
  );
}

export default function Friends() {
  const st: User = useLocation().state;
  const [friendList, setFriends] = useState<FriendComponent[] | null>(null);

  const [user, setUser] = useState<User>({
    name: st.name,
    email: st.email,
    username: st.username,
    profilePic: st.profilePic,
    tags: st.tags,
    books: st.books,
    entries: st.entries,
    friendsList: st.friendsList,
    friendsRequest: st.friendsRequest,
  });

  const [modalDisplay, setModalDisplay] = useState<boolean>(false); // For controlling the search bar

  useEffect(() => {
    if (friendList == null) {
      grabFriendComponents(user).then((fList) => setFriends(fList));
    }
  }, []);
  return (
    <div>
      <Header user={user} />
      <div id="book-buttons" aria-label={TEXT_user_posts}>
        <button aria-roledescription={TEXT_posts_button}>Posts</button>
        <button
          aria-roledescription={TEXT_search_button}
          type="submit"
          value="Search"
          onClick={() => {
            setModalDisplay(true);
          }}
        >
          Search
        </button>
      </div>
      <hr></hr>
      <div id="friend-menu">
        <Posts />
        <FriendListComponent friendList={friendList} setFriends={setFriends} />
        <SearchModal
          display={modalDisplay}
          setDisplay={setModalDisplay}
          searcher={user}
        />
      </div>
      <Footer user={user} />
    </div>
  );
}
