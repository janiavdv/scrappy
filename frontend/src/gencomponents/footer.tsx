import User from "./user";
import { useNavigate } from "react-router-dom";

const TEXT_footer = `This is the footer, which contains buttons that link to our
about, help, FAQ, and privacy page.`;
const TEXT_about_button = `Click here for the about page!`;
const TEXT_help_button = `Click here for the help page!`;
const TEXT_faq_button = `Click here for the FAQs page!`;
const TEXT_privacy_button = `Clicke here for our privacy policy!`;

export default function Footer({ user }: { user: User | null }) {
  const navigate = useNavigate();
  return (
    <div id="footer" aria-label={TEXT_footer}>
      <div>
        <button
          onClick={async () => {
            console.log("About clicked!");
            navigate("/about", { state: user });
          }}
          id="footerButton"
          aria-roledescription={TEXT_about_button}
        >
          About
        </button>
        <button
          onClick={async () => {
            console.log("Help clicked!");
            navigate("/help", { state: user });
          }}
          id="footerButton"
          aria-roledescription={TEXT_help_button}
        >
          Help
        </button>

        <h3>Scrappy © All Rights Reserved</h3>

        <button
          onClick={async () => {
            console.log("FAQs clicked!");
            navigate("/faqs", { state: user });
          }}
          id="footerButton"
          aria-roledescription={TEXT_faq_button}
        >
          FAQs
        </button>

        <button
          onClick={async () => {
            console.log("Privacy clicked!");
            navigate("/privacy", { state: user });
          }}
          id="footerButton"
          aria-roledescription={TEXT_privacy_button}
        >
          Privacy
        </button>
      </div>
    </div>
  );
}
