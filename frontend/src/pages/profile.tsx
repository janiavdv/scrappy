import { useState } from "react";
import { useLocation } from "react-router-dom";

export const TEXT_text_box_accessible_name = "Text Box for Information Entry.";

interface user {
    name: string,
    email: string,
    username: string,
    picture: string
}

export default function Profile() {
    const st: user = useLocation().state
    const [user, setUser] = useState<user>({
        name: st.name,
        email: st.email,
        username: st.username,
        picture: st.picture
    })

    return (
        <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.username}</p>
            <img src={user.picture} id="logopic" />
        </div>
    )
}
