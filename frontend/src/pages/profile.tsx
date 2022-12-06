import { useState } from "react";
import { useLocation } from "react-router-dom";
import { User } from "../gencomponents/user";
import Header from '../gencomponents/header';


export const TEXT_text_box_accessible_name = "Text Box for Information Entry.";

export default function Profile() {
    const st: User = useLocation().state
    const [user, setUser] = useState<User>({
        name: st.name,
        email: st.email,
        username: st.username,
        picture: st.picture
    })

    return (
        <div>
            <Header /> 
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.username}</p>
            <img src={user.picture} id="logopic" />
        </div>
    )
}
