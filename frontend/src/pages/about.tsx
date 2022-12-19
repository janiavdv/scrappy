import Header from "../gencomponents/header";
import Footer from "../gencomponents/footer";
import User from "../interfaces/user";
import { useLocation } from "react-router-dom";

export default function About() {
  const st: User = useLocation().state;
  return (
    <div>
      <Header user={st} />
      <div className="extra-page-content">
        <h2>About</h2>
        <h4>
          Scrappy is a photo sharing/scrapbook creating site. Users can, every
          day, start a new scrapbook that contains information about the day,
          and their own personal "pages" they add to a book. Default information
          includes:{" "}
        </h4>
        <ul>
          <li>New York Times Headline of the Day</li>
          <li>Generated inspirational quote</li>
          <li>More to come!</li>
        </ul>

        <blockquote>
          Throughout the day, a user can add images to the book with captions.
          At midnight EST, the book closes, and users are left with a memorable
          recap of their day to reflect on in the future.
        </blockquote>
        <h3>Features:</h3>
        <blockquote>
          Users can have friends who can see each other’s books, and even see
          relevant posts based on their provided interests ("tags"). Each
          “entry” to a scrapbook can be thought of as a post object. Entries
          marked as public will go to a gallery view of different posts, where
          an algorithm presents the most interesting/relevant posts. A post
          designated as private can be in a seperate chronological timeline only
          seen by friends. Friends are maintained through an authentication and
          login system. Users have a profile where they can view their
          scrapbooks and add to the daily book.
        </blockquote>
      </div>
      <Footer user={st} />
    </div>
  );
}
