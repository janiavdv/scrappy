import { useLocation } from "react-router-dom";
import Footer from "../gencomponents/footer";
import Header from "../gencomponents/header";
import User from "../interfaces/user";

export default function FAQ() {
  const st: User = useLocation().state;
  return (
    <div>
      <Header user={st} />
      <div className="extra-page-content">
        <h2>FAQ</h2>
        <h3>What is the story behind this app?</h3>
        <h4>
          We are 5 friends from CS 32 at Brown University who believe in journaling and creating memories!
        </h4>
        <h3>How do I log out?</h3>
        <h4>
          Click the "log out" button in the top right corner.
        </h4>
        <h3>How do I post?</h3>
        <h4>
          The post button is on the profile page on the righ panel!
        </h4>
        <h3>How do I add a friend?</h3>
        <h4>
          Hit the search button on the "Friends" page. Enter your friend's exact user!
        </h4>
        <h3>I noticed a bug, how do I contact the creators?</h3>
        <h4>
          Email one of us! tyler_gurth@brown.edu, jania_vandevoorde@brown.edu, alana_cho@brown.edu, gianna_aiello@brown.edu, zachary_boston@brown.edu
        </h4>
      </div>
      <Footer user={st} />
    </div>
  );
}
