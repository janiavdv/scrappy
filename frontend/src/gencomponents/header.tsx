import User from "./user";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ScrappyLogo.svg";
import { googleLogout } from "@react-oauth/google";

const TEXT_header = `This is the header, which contains links to the friends, 
gallery, and profile pages. It also displays your profile picture and a button
to log out.`;
const TEXT_friends_button = `Click here to view your friends page!`;
const TEXT_gallery_button = `Click here to view your gallery!`;
const TEXT_profile_button = `Click here to view your profile!`;

const TEXT_logout = `Click this button to logout of your account.`;

export default function Header({ user }: { user: User }) {
  const navigate = useNavigate();

  if (user != null) {
    return (
      <div id="header" aria-label={TEXT_header}>
        <div id="navbar">
          <div id="left-nav">
            <img src={logo} id="logo-nav"></img>

            <button
              onClick={async () => {
                console.log("Friends clicked!");
                navigate("/friends:" + user.username, { state: user });
              }}
              id="headerButton"
              aria-roledescription={TEXT_friends_button}
            >
              Friends
            </button>

            <button
              onClick={async () => {
                console.log("Gallery clicked!");
                navigate("/gallery:" + user.username, { state: user });
              }}
              id="headerButton"
              aria-roledescription={TEXT_gallery_button}
            >
              Gallery
            </button>

            <button
              onClick={async () => {
                console.log("Profile clicked!");
                navigate("/profile:" + user.username, { state: user });
              }}
              id="headerButton"
              aria-roledescription={TEXT_profile_button}
            >
              Profile
            </button>
          </div>

          <div id="prof-in-nav">
            <img
              src={user.profilePic}
              id="profile-pic"
              referrerPolicy="no-referrer"
            />
            <button
              aria-roledescription={TEXT_logout}
              onClick={async () => {
                console.log("Profile clicked!");
                googleLogout();
                navigate("/");
              }}
            >
              {"Logout " + user.username}
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div id="header">
        <div id="navbar">
          <div id="left-nav">
            <button
              onClick={async () => {
                navigate("/");
              }}
              id="headerButton"
            >
              Home
            </button>
          </div>
          <div id="unlogged-right-div">
            <img src={logo} id="logo-nav"></img>
          </div>
        </div>
      </div>
    );
  }
}
