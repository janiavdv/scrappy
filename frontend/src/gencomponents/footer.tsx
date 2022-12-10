import User from './user';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export default function Footer() {

    const navigate = useNavigate();
    const [userValue, setUserValue] = useState<string>("") // For controlling the user textbox.

    return (
        <div id="footer">
            <div>
                <button
                    onClick={async () => {
                        console.log("About clicked!")
                        navigate("/about")
                    }}
                    id="footerButton">About</button>
                <button
                    onClick={async () => {
                        console.log("Help clicked!")
                        navigate("/help")
                    }}
                    id="footerButton">Help</button>

                <h3>Scrappy © All Rights Reserved</h3>

                <button
                    onClick={async () => {
                        console.log("FAQs clicked!")
                        navigate("/faqs")
                    }}
                    id="footerButton">FAQs</button>

                <button
                    onClick={async () => {
                        console.log("Privacy clicked!")
                        navigate("/privacy")
                    }}
                    id="footerButton">Privacy</button>
            </div>
        </div>
    )
}