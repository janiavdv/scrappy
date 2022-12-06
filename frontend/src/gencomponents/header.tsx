import User from './user';
import { useNavigate } from "react-router-dom";

export default function Header({user}: {user: User}) {

    const navigate = useNavigate();

    return (
        <div id="header">
            <div>
                <button 
                onClick={async () => {
                    console.log("Friends clicked!")
                    navigate("/friends")
                }}
                id="headerButton">Friends</button>
                
                <button 
                onClick={async () => {
                    console.log("Gallery clicked!")
                    navigate("/gallery")
                }}
                id="headerButton">Gallery</button>

                <button 
                onClick={async () => {
                    console.log("Profile clicked!")
                    navigate("/profile")
                }}
                id="headerButton">Profile</button>

                <img src={user.picture} id="logopic" />
            </div>
        </div>
    )
}