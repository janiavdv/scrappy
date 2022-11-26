import { useLocation } from "react-router-dom";

export default function Profile() {
    const st = useLocation().state
    return (
        <h1>{st.name}</h1>
    )
}