import User from './user';
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from 'react';

export default function Header({user}: {user: User}) {

    const navigate = useNavigate();
    const [userValue, setUserValue] = useState<string>("") // For controlling the user textbox.

    return (
        <div id="header">
            <div>
                <button 
                onClick={async () => {
                    console.log("Friends clicked!")
                    navigate("/friends" + userValue, { state: user })
                }}
                id="headerButton">Friends</button>
                
                <button 
                onClick={async () => {
                    console.log("Gallery clicked!")
                    navigate("/gallery" + userValue, { state: user })
                }}
                id="headerButton">Gallery</button>

                <button 
                onClick={async () => {
                    console.log("Profile clicked!")
                    navigate("/profile:" + userValue, { state: user })
                }}
                id="headerButton">Profile</button>

                <img src={user.picture} id="logopic" />

                <div id="dropdown">
                    <button>
                        Button
                    </button>
                    <div id="item">
                        <p> Log Out </p> {/*THIS IS WHERE LOGOUT FUNCTIONALITY WILL GO*/}
                    </div>
                </div>
            </div>
        </div>
    )
}