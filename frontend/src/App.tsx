import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";



function App() {

  const [fillName, setName] = useState()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>{fillName}</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <GoogleOAuthProvider clientId="359674566307-dej7oadld3jb6662l9brborqrs19blm4.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
            if (credentialResponse.credential != null) {
              let decoded: any = jwt_decode(credentialResponse.credential);
              console.log(decoded)
              setName(decoded.name)
            }

          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />;

      </GoogleOAuthProvider>;

    </div>
  );
}

export default App;
