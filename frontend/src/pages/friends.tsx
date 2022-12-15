import { Dispatch, SetStateAction, useState } from "react";
import { useLocation } from "react-router-dom";
import ControlledInput from "../gencomponents/controlledinput";
import Header from "../gencomponents/header";
import Footer from "../gencomponents/footer";
import User from "../gencomponents/user";
import { getQuery } from '../utils/dbutils';
import { FriendComponent } from "../gencomponents/friendcomponent";

const TEXT_user_posts = `Here you can view your friends' posts and search.`
const TEXT_posts_button = `Click here to see posts!`
const TEXT_search_button = `Click here to search for books!`

const TEXT_user_posts = `Here you can view your friends' posts and search.`
const TEXT_posts_button = `Click here to see posts!`
const TEXT_search_button = `Click here to search for books!`

function Posts() {
    return <p>these are all your friends' posts</p>;
}

interface SearchModalProps {
    display: boolean;
    setDisplay: Dispatch<SetStateAction<boolean>>;
}

function SearchModal({ display, setDisplay }: SearchModalProps) {
    const [searchValue, setSearchValue] = useState<string>(""); // For controlling the body textbox.
    const [searchedFriend, setSearchedFriend] = useState<User | null>(null);


    if (!display) {
        return null;
    }
    return (
        <div id="modal">
            <div id="log-modal">
                <h3>Enter the friend you are looking for's full username!</h3>
                <label htmlFor="search-input">Search:</label>
                <ControlledInput value={searchValue} setValue={setSearchValue} ariaLabel={""} spaces={false} id="search-input" />
                <button
                    type="submit"
                    value="Post"
                    onClick={async () => {
                        const user: User | null = await getQuery("USERNAME", "username", searchValue)
                        setSearchedFriend(user);
                    }}
                >Search
                </button>
                <hr></hr>
                <div id="searched-friend">
                    {searchedFriend ? (
                        <div>
                            <FriendComponent username={searchedFriend?.username} image={searchedFriend?.profilePic} />
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
                    }}
                >{" "}Close
                </button>
            </div>

        </div>
    )

}

export default function Friends() {
    const st: User = useLocation().state;
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

  return (
    <div>
      <Header user={user} />
      <div id="book-buttons" aria-label={TEXT_user_posts}>
        <button aria-roledescription={TEXT_posts_button}>
          Posts
        </button>
        <button aria-roledescription={TEXT_search_button}>
          Search
        </button>
      </div>
      <hr></hr>
      <div id="friend-menu">
        <Posts />
      </div>
      <Footer user={user} />
    </div>
  );
}
