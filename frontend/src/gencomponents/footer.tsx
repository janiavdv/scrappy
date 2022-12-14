import User from "./user";
import { useNavigate } from "react-router-dom";

export default function Footer({ user }: { user: User | null }) {
  const navigate = useNavigate();
  return (
    <div id="footer">
      <div>
        <button
          onClick={async () => {
            console.log("About clicked!");
            navigate("/about", { state: user });
          }}
          id="footerButton"
        >
          About
        </button>
        <button
          onClick={async () => {
            console.log("Help clicked!");
            navigate("/help", { state: user });
          }}
          id="footerButton"
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
        >
          FAQs
        </button>

        <button
          onClick={async () => {
            console.log("Privacy clicked!");
            navigate("/privacy", { state: user });
          }}
          id="footerButton"
        >
          Privacy
        </button>
      </div>
    </div>
  );
}
