import { Dispatch, SetStateAction, useState } from "react";
import { useLocation } from "react-router-dom";
import ControlledInput from "../gencomponents/controlledinput";
import Header from "../gencomponents/header";
import Footer from "../gencomponents/footer";
import User from "../interfaces/user";
import {
  addNewFriendRequest,
  getQuery,
  grabFriends,
  removeFriendFromDatabase,
} from "../utils/dbutils";
import FriendComponent, {
  FriendListComponent,
  FriendSearchResult,
} from "../gencomponents/friendcomponent";
import { useEffect } from "react";
import Friend from "../gencomponents/friendcomponent";
import FriendPosts from "../gencomponents/posts";
import Loading from "../gencomponents/loading";

const TEXT_user_posts = `Here you can view your friends' posts and search.`;
const TEXT_search_button = `Click here to search for books!`;
const TEXT_search_input = `Textbox for entering a query for a username`;
const BUTTON_get_friend_query = `Button to query for a username search given.`;
const BUTTON_friend_status = `Use this button to, `;
const BUTTON_close = `Button to close the query modal.`;

interface SearchModalProps {
  display: boolean;
  setDisplay: Dispatch<SetStateAction<boolean>>;
  searcher: User;
  friendsList: Friend[] | null;
  requestsList: Friend[] | null;
  setFriends: Dispatch<SetStateAction<Friend[] | null>>;
  setRequests: Dispatch<SetStateAction<Friend[] | null>>;
}

function SearchModal({
  display,
  setDisplay,
  searcher,
  setFriends,
  setRequests,
  requestsList,
  friendsList,
}: SearchModalProps) {
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
              <FriendSearchResult
                username={searchedFriend.username}
                image={searchedFriend.profilePic}
              />
              <button
                aria-label={BUTTON_friend_status + friendStatus}
                onClick={async () => {
                  if (friendStatus == "Request Friend") {
                    await addNewFriendRequest(
                      searchedFriend,
                      searcher.username
                    );
                    setFriendStatus("Remove Friend Request");
                  } else if (friendStatus == "Remove Friend Request") {
                    await removeFriendFromDatabase(
                      searchedFriend,
                      searcher.username,
                      true
                    );
                    setFriendStatus("Request Friend");
                  } else {
                    await removeFriendFromDatabase(
                      searcher,
                      searchedFriend.username,
                      false
                    );
                    setFriendStatus("Request Friend");
                    if (friendsList) {
                      let newList = friendsList.filter(
                        (el) => el.username != searchedFriend.username
                      );
                      setFriends(newList);
                    }
                  }
                }}
              >
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
  const [requestList, setRequests] = useState<FriendComponent[] | null>(null);

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
      grabFriends(user, false).then((fList) => setFriends(fList));
    }
    if (requestList == null) {
      grabFriends(user, true).then((rList) => setRequests(rList));
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
        {friendList ? <FriendPosts friendList={friendList} /> : <Loading />}
        <div>
          <FriendListComponent
            friendList={friendList}
            setFriends={setFriends}
            user={user}
            requests={false}
          />
          <FriendListComponent
            friendList={friendList}
            setFriends={setFriends}
            requestList={requestList}
            setRequests={setRequests}
            user={user}
            requests={true}
          />
        </div>
        <SearchModal
          display={modalDisplay}
          setDisplay={setModalDisplay}
          searcher={user}
          setFriends={setFriends}
          setRequests={setRequests}
          friendsList={friendList}
          requestsList={requestList}
        />
      </div>
      <Footer user={user} />
    </div>
  );
}
