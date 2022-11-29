import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import logo from "../assets/ScrappyLogo.svg"
import sample from "../assets/sampleentry.png"
import {
    useNavigate
} from "react-router-dom";

import { GoogleOAuthProvider } from '@react-oauth/google';
import { authcred } from '../private/credentials';

function Footer() {
    return (
        <div id="footer">
            <div>
                <span>Help</span>
                <span>About</span>
                <h3>Scrappy © All Rights Reserved</h3>
                <span>FAQs</span>
                <span>Privacy</span>
            </div>
        </div>
    )
}

function AuthButton() {
    const navigate = useNavigate();
    return (
        <GoogleLogin
            width="250"
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
                if (credentialResponse.credential != null) {
                    let decoded: any = jwt_decode(credentialResponse.credential);
                    // setName(decoded.name)
                    // THIS IS WHERE WE STOP THEM AND MAKE THEM MAKE A USER NAME
                    navigate("/profile:" + decoded.name, {state: decoded})
                }
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    )
}

export default function Landing() {
    return (
        <div>
            <div id="landing-main-page-box">
                <div id="main-left">
                    <h1>Scrappy</h1>
                    <h2>Let's Make Memories</h2>
                    <div id="google-button">
                        <GoogleOAuthProvider clientId={authcred}>
                            <AuthButton />
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
        </div>

    )
}
