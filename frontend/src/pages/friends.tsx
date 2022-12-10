import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../gencomponents/header';
import User from '../gencomponents/user';

export default function Friends() {
    const st: User = useLocation().state
    const [user, setUser] = useState<User>({
        name: st.name,
        email: st.email,
        username: st.username,
        profilePic: st.profilePic,
        tags: st.tags
    })

    return (
        <div>
            <Header user={user} />
            <h1>This is the Friends Page</h1>
        </div>
    )
}