import { useLocation } from "react-router-dom";

const list_of_users: Array<string> = ["jania_vandevoorde@brown.edu"]

function LogModal() {
    return (
        <p> {"Popup window"} </p>
    )
}

export default function Profile() {
    const st = useLocation().state
    if (list_of_users.includes(st.email)) {
        return (
            <p>{st.name + " has an account."}</p>
        )
    } else {
        return (
            <h1>{st.name + " does not have an account yet."}</h1>
        )
    }
}