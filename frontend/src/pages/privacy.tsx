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
        <h1>PRIVACY</h1>
        <h3>
          We at Scrappy want you to feel comfortable with using our application
          and understand what we are doing with the information and data that
          you provide us. We encourage you to read this Privacy Policy in order
          to understand how the security of this application and how your data
          and information is being used.
        </h3>
        <h3>
          There are three major ways that the website it personalized to you.
          Namely, they are:
        </h3>
        <h3>1. Google Account Authentication</h3>
        <h3>2. Provided Data Through Pictures and Text in the Entries</h3>
        <h3>3. Personal Profile Information</h3>
        <h3>
          We want to ensure you that none of this information will be used in
          the application nor for outside reasons without your permission.
          Additionally, we designed our application specifically to keep your
          information and data private and unshared.
        </h3>
      </div>
      <Footer user={st} />
    </div>
  );
}
