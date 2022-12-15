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
          day, start a new scrapbook that contains information about the day:{" "}
        </h4>
        <h4>
          date, weather (high/low), horoscope, new york times headlines, stocks
          etc. The list goes on for each user
        </h4>
        <h4>
          Throughout the day, a user can add images to the book with captions.
          Each “scrapbook” for a day will also have a general text entry that
          users can add to describe their day. At midnight, the book closes, and
          users are left with a memorable recap of their day, to reflect on in
          the future.
        </h4>
        <h3>Features:</h3>
        <h4>
          Users can have friends who can see each other’s books, and even create
          shared books together. Shared books can be a great way to remember
          events like a wedding, fun night out, etc. Users can look at past
          books, and combine them. Users can see regional posts. Each “entry” to
          a scrapbook can be thought of as a post object. Entries marked as
          public will go to a regional array view of different posts, where the
          public (in the same region) can browse them. A post designated as
          private can be in a seperate chronological timeline only seen by
          friends. Friends are maintained through an authentication and login
          system. Users have a profile where they can view their scrapbooks, add
          to the daily book, and shared books.
        </h4>
      </div>
      <Footer user={st} />
    </div>
  );
}
