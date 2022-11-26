import './App.css';

import Landing from './pages/landing';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Profile from './pages/profile';

const router = createBrowserRouter([
  {
    path: "/profile:id",
    element: <Profile />,
  },
  {
    path: "/",
    element: <Landing />
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider
        router={router}
      />

    </div>
  );
}

export default App;
