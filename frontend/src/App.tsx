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
      <p>{fillName}</p>
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
        />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
