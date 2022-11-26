import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import { authcred } from './private/credentials';

import Landing from './pages/landing';



function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId={authcred}>
        <Landing />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
