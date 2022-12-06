import './App.css';

import Landing from './pages/landing';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Profile from './pages/profile';
import Gallery from './pages/gallery';
import Friends from './pages/friends';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/profile:id",
    element: <Profile />,
  },
  {
    path: "/friends",
    element: <Friends />
  },
  {
    path: "/gallery",
    element: <Gallery />
  }
]);

export default function App() {
  return (
    <div className="App">
      <RouterProvider
        router={router}
      />

    </div>
  );
}
