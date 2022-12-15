import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import logo from "../assets/ScrappyLogo.svg";
import sample from "../assets/sampleentry.png";
import { useNavigate } from "react-router-dom";
import { authcred } from "../private/credentials";
import { Dispatch, SetStateAction, useState } from "react";
import { TEXT_text_box_accessible_name } from "./profile";
import Footer from "../gencomponents/footer";
import ControlledInput from "../gencomponents/controlledinput";
import User from "../interfaces/user";
import { getQuery, addUserToDatabase } from "../utils/dbutils";

interface TagProps {
  value: string;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

function Tag({ value, tags, setTags }: TagProps) {
  return (
    <div className="tag">
      <p className="tag-value">{"#" + value}</p>
      <button
        onClick={() => {
          setTags(tags.filter((t) => t !== value));
        }}
      >
        X
      </button>
    </div>
  );
}

interface AddedTagProps {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

function AddedTags({ tags, setTags }: AddedTagProps) {
  return (
    <div id="added-tags">
      {tags.map((tagValue) => (
        <Tag value={tagValue} tags={tags} setTags={setTags} key={tagValue} />
      ))}
    </div>
  );
}

interface ModalProps {
  userEmail: string;
  userPicture: string;
  display: boolean;
}

function LogModal({ userEmail, userPicture, display }: ModalProps) {
  const [userValue, setUserValue] = useState<string>(""); // For controlling the user textbox.
  const [nameValue, setNameValue] = useState<string>(""); // For controlling the name textbox.
  const [tagValue, setTagValue] = useState<string>("");

  const [tags, setTags] = useState<string[]>([]);
  const navigate = useNavigate();

  const [userExists, setUserExists] = useState<boolean>(false);
  const [tagsEmpty, setTagsEmpty] = useState<boolean>(false);

  if (!display) {
    return null;
  } else {
    return (
      <div id="modal">
        <div id="log-modal">
          <h3>
            Hey! Looks like it's your first time here. We'd like to get to know
            you a little better.
          </h3>
          <label>
            Username (cannot contain spaces):
            <ControlledInput
              value={userValue}
              setValue={setUserValue}
              ariaLabel={TEXT_text_box_accessible_name}
              spaces={false}
            />
          </label>
          <br />
          <label>
            Preferred Name (first and last):
            <ControlledInput
              value={nameValue}
              setValue={setNameValue}
              ariaLabel={TEXT_text_box_accessible_name}
              spaces={true}
            />
          </label>
          <br />
          <hr></hr>
          <label>
            Add up to 5 hashtags that interest you! (You won't be able to change
            these later):
            <ControlledInput
              value={tagValue}
              setValue={setTagValue}
              ariaLabel={TEXT_text_box_accessible_name}
              spaces={false}
            />
            <button
              onClick={() => {
                setTagValue("");
                if (tags.length < 5 && !tags.includes(tagValue)) {
                  setTags([...tags, tagValue]);
                }
              }}
            >
              Add Tag
            </button>
          </label>
          <AddedTags tags={tags} setTags={setTags} />
          <button
            type="submit"
            value="Submit"
            onClick={async () => {
              if (userValue !== "" && nameValue !== "") { // if the parameters aren't empty
                const existingUser: User | null = await getQuery("USERNAME", "username", userValue)
                if (existingUser == null) { // if the user doesn't already exist
                  const user: User = {
                    name: nameValue,
                    username: userValue,
                    email: userEmail,
                    profilePic: userPicture,
                    tags: tags,
                    books: [],
                    entries: [],
                    friendsList: [],
                    friendsRequest: [],
                  }
                  if (user.tags.length == 0) {
                    setTagsEmpty(true)
                  } else {
                    addUserToDatabase(user);
                    navigate("/profile:" + userValue, { state: user });
                  }
                }
                else {
                  console.log("user exists!!!")
                  setUserExists(true)
                  // do something when the user already exists!
                }
              }
            }}> Submit
          </button>
          <div id="user-exists-error">
            <p> {userExists ? "User already exists!" : null} </p>
          </div>
        </div>
      </div >
    );
  }
}

interface AuthProps {
  setEmail: Dispatch<SetStateAction<string>>;
  setPicture: Dispatch<SetStateAction<string>>;
  setDisplay: Dispatch<SetStateAction<boolean>>; // USeful for clearing the textbox.
}

function AuthButton({ setEmail, setDisplay, setPicture }: AuthProps) {
  const navigate = useNavigate();
  return (
    <GoogleLogin
      width="250"
      onSuccess={async (credentialResponse) => {
        if (credentialResponse.credential != null) {
          let decoded: any = jwt_decode(credentialResponse.credential);

          let retrievedQuery = await getQuery("EMAIL", "email", decoded.email);
          if (retrievedQuery != null) {
            const user: User = {
              name: retrievedQuery.name,
              username: retrievedQuery.username,
              email: retrievedQuery.email,
              profilePic: retrievedQuery.profilePic,
              tags: retrievedQuery.tags,
              books: retrievedQuery.books,
              entries: retrievedQuery.entries,
              friendsList: retrievedQuery.friendsList,
              friendsRequest: retrievedQuery.friendsRequest,
            };
            navigate("/profile:" + user.username, { state: user });
          } else {
            setEmail(decoded.email);
            setPicture(decoded.picture);
            setDisplay(true);
          }
        }
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}

export default function Landing() {
  const [modalDisplay, setModalDisplay] = useState<boolean>(false); // For controlling the user textbox.
  const [email, setEmail] = useState<string>("");
  const [picture, setPicture] = useState<string>("");

  return (
    <div>
      <div id="landing-main-page-box">
        <div id="main-left">
          <h1>Scrappy</h1>
          <h2>Let's Make Memories</h2>
          <div id="google-button">
            <GoogleOAuthProvider clientId={authcred}>
              <AuthButton
                setDisplay={setModalDisplay}
                setEmail={setEmail}
                setPicture={setPicture}
              />
            </GoogleOAuthProvider>
          </div>
          <blockquote>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </blockquote>
        </div>
        <div id="main-right">
          <img src={logo} id="logopic"></img>
          <img src={sample} id="sample-entry"></img>
        </div>
      </div>
      <Footer user={null} />
      <LogModal
        userEmail={email}
        display={modalDisplay}
        userPicture={picture}
      />
    </div>
  );
}
