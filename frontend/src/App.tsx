import "./App.css";

import Landing from "./pages/landing";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./pages/profile";
import Gallery from "./pages/gallery";
import Friends from "./pages/friends";
import FAQ from "./pages/faq";
import About from "./pages/about";
import Help from "./pages/help";
import Privacy from "./pages/privacy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/profile:id",
    element: <Profile />,
  },
  {
    path: "/friends:id",
    element: <Friends />,
  },
  {
    path: "/gallery:id",
    element: <Gallery />,
  },
  {
    path: "/faqs",
    element: <FAQ />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/help",
    element: <Help />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
]);

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
