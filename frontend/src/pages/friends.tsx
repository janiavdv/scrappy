import { Dispatch, SetStateAction, useState } from "react";
import { useLocation } from "react-router-dom";
import ControlledInput from "../gencomponents/controlledinput";
import Header from "../gencomponents/header";
import Footer from "../gencomponents/footer";
import User from "../interfaces/user";
import { getQuery } from "../utils/dbutils";
import FriendComponent, {
  FriendComponentSearch,
  FriendListComponent,
  grabFriendComponents,
} from "../gencomponents/friendcomponent";
import { useEffect } from "react";

const TEXT_user_posts = `Here you can view your friends' posts and search.`;
const TEXT_search_button = `Click here to search for books!`;
const TEXT_search_input = `Textbox for entering a query for a username`;
const BUTTON_get_friend_query = `Button to query for a username search given.`;
const BUTTON_friend_status = `Use this button to, `;
const BUTTON_close = `Button to close the query modal.`;

function FriendPosts() {
  return <div id="friend-post-section" aria-label={TEXT_user_posts}></div>;
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
          ariaLabel={TEXT_search_input}
          spaces={false}
          id="search-input"
        />
        <button
          type="submit"
          value="Post"
          aria-label={BUTTON_get_friend_query}
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
              <button aria-label={BUTTON_friend_status + friendStatus}>
                {friendStatus}
              </button>
            </div>
          ) : (
            <p>No such friend found.</p>
          )}
        </div>
        <hr></hr>
        <button
          className="close-button"
          aria-label={BUTTON_close}
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
      <div id="friend-menu">
        <div id="friends-search-info">
          <h3>Search for new friends, and manage friendships!</h3>
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
          <p>
            No posts? The friends section only shows posts (new pages to a daily
            book) from Today. That means your friends need to get to posting!
          </p>
          <p>Public AND Private posts are shown in this section.</p>
        </div>
        <FriendPosts />
        <FriendListComponent
          friendList={friendList}
          setFriends={setFriends}
          extended={true}
        />
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
