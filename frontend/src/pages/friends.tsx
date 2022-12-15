import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../gencomponents/header";
import Footer from "../gencomponents/footer";
import User from "../gencomponents/user";

const TEXT_user_posts = `Here you can view your friends' posts and search.`
const TEXT_posts_button = `Click here to see posts!`
const TEXT_search_button = `Click here to search for books!`

function Posts() {
  return <p>these are all your friends' posts</p>;
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
