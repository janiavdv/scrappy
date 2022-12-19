import { useState } from "react";
import { useLocation, useResolvedPath } from "react-router-dom";
import Header from "../gencomponents/header";
import Footer from "../gencomponents/footer";
import User from "../interfaces/user";
import { GalleryPosts } from "../gencomponents/posts";

export default function Gallery() {
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
      <GalleryPosts user={user} />
      <Footer user={user} />
    </div>
  );
}
