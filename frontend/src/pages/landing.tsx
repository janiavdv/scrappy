import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import logo from "../assets/ScrappyLogo.svg"
import sample from "../assets/sampleentry.png"
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
    return (
        <GoogleLogin
            width="250"
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
                if (credentialResponse.credential != null) {
                    let decoded: any = jwt_decode(credentialResponse.credential);
                    console.log(decoded)
                    // setName(decoded.name)
                    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
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
                        <AuthButton />
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
