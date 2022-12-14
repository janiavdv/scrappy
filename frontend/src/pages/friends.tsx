import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../gencomponents/header';
import Footer from '../gencomponents/footer';
import User from '../gencomponents/user';

function Posts() {
    return (
        <p>these are friends' posts</p>
    )
}

export default function Friends() {
    const st: User = useLocation().state
    const [user, setUser] = useState<User>({
        name: st.name,
        email: st.email,
        username: st.username,
        profilePic: st.profilePic,
        tags: st.tags,
        books: st.books,
        entries: st.entries,
        friendsList: st.friendsList,
        friendsRequest: st.friendsRequest
    })

    return (
        <div>
            <Header user={user} />
            <div id="book-buttons">
                <button>Posts</button>
                <button>Search</button>
            </div>
            <hr></hr>
            <div id="friend-menu">
                <Posts/>
            </div>
            <Footer user={user} />
        </div>
    )
}