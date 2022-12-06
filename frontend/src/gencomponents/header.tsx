import User from './user';

export default function Header({user}: {user: User}) {
    return (
        <div id="header">
            <div>
                <span>Friends</span>
                <span>Gallery</span>
                <span>Profile</span>
                <span>{user.picture}</span>
            </div>
        </div>
    )
}