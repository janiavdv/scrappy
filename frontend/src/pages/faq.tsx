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
        <blockquote>
          We are 5 friends from CS 32 at Brown University who believe in
          journaling and creating memories!
        </blockquote>
        <h3>How long did scrappy take to make?</h3>
        <blockquote>
          75 hours over the course of 3 weeks. Luckily, teamwork made the job
          fun!
        </blockquote>
        <h3>What future updates can we imagine being added?</h3>
        <blockquote>
          An update that would allow the user to see reccomended mutual friends,
          and a mobile version!
        </blockquote>
        <h3>What should I do if I find a bug?</h3>
        <blockquote>
          Let us know:
          <br />
          <br />
          <a href="mailto:scrappy@gmail.com">Contact us via email.</a>
          <br />
          <br />
          We will try to get it fixed right away!
        </blockquote>
      </div>
      <Footer user={st} />
    </div>
  );
}
