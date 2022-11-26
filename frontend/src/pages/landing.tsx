import { logicalExpression } from '@babel/types';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import React, { useState } from 'react';
import background from '../assets/peopleonboat.png';
import logo from "../assets/ScrappyLogo.svg"
function AuthButton() {
    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
                if (credentialResponse.credential != null) {
                    let decoded: any = jwt_decode(credentialResponse.credential);
                    console.log(decoded)
                    // setName(decoded.name)
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
        <div id="landing-main-page-box">
            <div>
                <h1>Scrappy</h1>
                <h2>Let's Make Memories</h2>
                <AuthButton />
            </div>
            <div>
                <img src={logo} id="logopic"></img>
            </div>

        </div>
    )
}
