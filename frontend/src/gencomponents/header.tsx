import User from "./user";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ScrappyLogo.svg";
import { googleLogout } from "@react-oauth/google";

export default function Header({ user }: { user: User }) {
  const navigate = useNavigate();

  if (user != null) {
    return (
      <div id="header">
        <div id="navbar">
          <div id="left-nav">
            <img src={logo} id="logo-nav"></img>

            <button
              onClick={async () => {
                console.log("Friends clicked!");
                navigate("/friends:" + user.username, { state: user });
              }}
              id="headerButton"
            >
              Friends
            </button>

            <button
              onClick={async () => {
                console.log("Gallery clicked!");
                navigate("/gallery:" + user.username, { state: user });
              }}
              id="headerButton"
            >
              Gallery
            </button>

            <button
              onClick={async () => {
                console.log("Profile clicked!");
                navigate("/profile:" + user.username, { state: user });
              }}
              id="headerButton"
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
