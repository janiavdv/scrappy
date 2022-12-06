import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import logo from "../assets/ScrappyLogo.svg"
import sample from "../assets/sampleentry.png"
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { authcred } from '../private/credentials';
import { Dispatch, SetStateAction, useState } from 'react';
import { TEXT_text_box_accessible_name } from './profile';
import Footer from '../gencomponents/footer';
import ControlledInput from '../gencomponents/controlledinput';
import User from "../gencomponents/user";

const list_of_users: Array<string> = [] //["jania_vandevoorde@brown.edu"]

async function addUserToDatabase(user : User) {
    const response = await fetch(`http://localhost:3232/database?command=ADD&type=USER&email=${user.email}&username=${user.username}&name=${user.name}&profilePic=${user.picture}`);
}

interface ModalProps {
    userEmail: string,
    userPicture: string,
    display: boolean
}

function LogModal({ userEmail, userPicture, display }: ModalProps) {
    const [userValue, setUserValue] = useState<string>("") // For controlling the user textbox.
    const [nameValue, setNameValue] = useState<string>("") // For controlling the name textbox.

    const navigate = useNavigate();

    if (!display) {
        return null;
    } else {
        return (
            <div id="modal">
                <div id="log-modal">
                    <h3>Hey! Looks like it's your first time here. We'd like to get to know you a little better.</h3>
                    <label>
                        Username (cannot contain spaces):
                        <ControlledInput value={userValue} setValue={setUserValue} ariaLabel={TEXT_text_box_accessible_name} spaces={false} />
                    </label>
                    <br />
                    <label>
                        Preferred Name (first and last):
                        <ControlledInput value={nameValue} setValue={setNameValue} ariaLabel={TEXT_text_box_accessible_name} spaces={true} />
                    </label>
                    <br />
                    <button type="submit" value="Submit" onClick={() => {
                        const user : User = {
                            name: nameValue,
                            username: userValue,
                            email: userEmail,
                            picture: userPicture
                        }
                        addUserToDatabase(user);
                        navigate("/profile:" + userValue, { state: user })
                    }} >Submit</button>
                </div>
            </div>
        )
    }
}

interface AuthProps {
    setEmail: Dispatch<SetStateAction<string>>,
    setPicture: Dispatch<SetStateAction<string>>,
    setDisplay: Dispatch<SetStateAction<boolean>> // USeful for clearing the textbox.
}

function AuthButton({ setEmail, setDisplay, setPicture }: AuthProps) {
    const navigate = useNavigate();
    return (
        <GoogleLogin
            width="250"
            onSuccess={async credentialResponse => {
                console.log(credentialResponse);
                if (credentialResponse.credential != null) {
                    let decoded: any = jwt_decode(credentialResponse.credential);
                    
                    let retrievedQuery = await getQuery(decoded.email);
                    console.log(retrievedQuery)
                    if (retrievedQuery != null) { 
                        const user = {
                            name: retrievedQuery.name,
                            username: retrievedQuery.username,
                            email: retrievedQuery.email,
                            picture: retrievedQuery.profilePic
                        }
                        navigate("/profile:" + user.username, { state: user })
                    } else {
                        console.log("im being called")
                        setEmail(decoded.email)
                        setPicture(decoded.picture)
                        setDisplay(true)
                    }
                }
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    )
}

async function getQuery(email: string) {
    const response : any = await fetch(`http://localhost:3232/database?command=QUERY&type=EMAIL&email=${email}`);
    const json = await response.json();
    console.log(json.result)
    if (json.result == "success.") {
        console.log(json)
        return json.User;
    } else {
        return null;
    }
}

export default function Landing() {
    const [modalDisplay, setModalDisplay] = useState<boolean>(false) // For controlling the user textbox.
    const [email, setEmail] = useState<string>("")
    const [picture, setPicture] = useState<string>("")

    return (
        <div>
            <div id="landing-main-page-box">
                <div id="main-left">
                    <h1>Scrappy</h1>
                    <h2>Let's Make Memories</h2>
                    <div id="google-button">
                        <GoogleOAuthProvider clientId={authcred}>
                            <AuthButton setDisplay={setModalDisplay} setEmail={setEmail} setPicture={setPicture} />
                        </GoogleOAuthProvider>
                    </div>
                    <blockquote>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</blockquote>
                </div>
                <div id="main-right">
                    <img src={logo} id="logopic"></img>
                    <img src={sample} id="sample-entry"></img>
                </div>
            </div>
            <Footer />
            <LogModal userEmail={email} display={modalDisplay} userPicture={picture} />
        </div>
    )
}
