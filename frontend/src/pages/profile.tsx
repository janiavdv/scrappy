import { useLocation } from "react-router-dom";

const list_of_users: Array<string> = [] //["jania_vandevoorde@brown.edu"]

function LogModal() {
    return (
        <form>
            <label>
                Username (cannot contain spaces):
                <input type="text" name="username" />
            </label>
            <br />
            <label>
                Preferred Name (first and last):
                <input type="text" name="name" />
            </label>
            <br />
            <input type="submit" value="Submit" />
        </form>
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
            <div> 
                <p>{st.name + " does not have an account yet."}</p> 
                <div className="App">
                    <LogModal />      
                </div>
            </div>
        )
    }
}