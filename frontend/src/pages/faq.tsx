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
        <h3>How long did this current version take us?</h3>
        <h4>
          75 hours!
        </h4>
        <h3>What future updates can we imagine being added?</h3>
        <h4>
          An update that would allow the user to see reccomended mutual friends, and a mobile version!
        </h4>
      </div>
      <Footer user={st} />
    </div>
  );
}
