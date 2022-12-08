import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../gencomponents/header';
import User from '../gencomponents/user';

export default function Gallery() {
    const st: User = useLocation().state
    const [user, setUser] = useState<User>({
        name: st.name,
        email: st.email,
        username: st.username,
        picture: st.picture,
        taglist: st.taglist
    })
    
    return (
        <div> 
            <Header user={user} /> 
            <h1>This is the Gallery Page</h1>
        </div>
    )
}