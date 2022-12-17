import { useLocation } from "react-router-dom";
import Footer from "../gencomponents/footer";
import Header from "../gencomponents/header";
import User from "../interfaces/user";

export default function Privacy() {
  const st: User = useLocation().state;

  return (
    <div>
      <Header user={st} />
      <div className="extra-page-content">
        <h2>PRIVACY</h2>
        <blockquote>
          We at Scrappy want you to feel comfortable with using our application
          and understand what we are doing with the information and data that
          you provide us. We encourage you to read this Privacy Policy in order
          to understand how the security of this application and how your data
          and information is being used.
        </blockquote>
        <h3>
          There are three major ways that the website it personalized to you.
          Namely, they are:
        </h3>
        <ul>
          <li>Google Account Authentication</li>
          <li>
            Provided Data Through Pictures and Text in the Entries - all data is
            given by you!
          </li>
          <li>Personal Profile Information seen only by you.</li>
        </ul>
        <blockquote>
          We want to ensure you that none of this information will be used in
          the application nor for outside reasons without your permission.
          Additionally, we designed our application specifically to keep your
          information and data private and unshared.
        </blockquote>
      </div>
      <Footer user={st} />
    </div>
  );
}
