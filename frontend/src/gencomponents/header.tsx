import User from './user';

export default function Header({user}: {user: User}) {
    return (
        <div id="header">
            <div>
                <button 
                onClick={async () => {
                    console.log("Friends clicked!")
                }}
                id="headerButton">Friends</button>
                
                <button 
                onClick={async () => {
                    console.log("Gallery clicked!")
                }}
                id="headerButton">Gallery</button>

                <button 
                onClick={async () => {
                    console.log("Profile clicked!")
                }}
                id="headerButton">Profile</button>

                <img src={user.picture} id="logopic" />
            </div>
        </div>
    )
}