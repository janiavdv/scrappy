import { useLocation } from "react-router-dom";
import Footer from "../gencomponents/footer";
import Header from "../gencomponents/header";
import User from "../interfaces/user";

export default function Help() {
  const st: User = useLocation().state;
  return (
    <div>
      <Header user={st} />
      <div className="extra-page-content">
        <h2>Help</h2>
        <h4>Logging In/Out:</h4>
        <blockquote>
          Use your google account to login via the home landing page. If it's
          your first time with us, you'll need to make an account with our
          system, but from then on, all authentication will be handled through
          google.
          <br />
          <br />
          To logout, simply click the "logout" button in the top right corner of
          the navigation bar, note, the button only appears when logged in!
        </blockquote>
        <h4>Making a Post (a new page to your daily book):</h4>
        <blockquote>
          On the "Profile" page exists a button on the right side that says
          "Create new Page". A page is synonymous with a "post", it gets added
          to your daily book, and if you set it to public, can be seen by the
          whole world based on the hashtag you give it!
        </blockquote>
        <h4>Friends</h4>
        <blockquote>
          You can manage friends through the "Profile" page or "Friends" page.
          Both show a scrollable list of all your current friends.
          <br />
          <br />
          To add new friends, use the search button in the "Friends" page, and
          enter their exact user. You can find new friends you don't know via
          the gallery page, which shows posts from around the world that match
          your interests, and who posted them. All additional friends must be
          made by sending a friend request. All friend requests are shown on the
          "Friends" page under the current friends list, where you can accept or
          delete them!
        </blockquote>
      </div>
      <Footer user={st} />
    </div>
  );
}
