import User from "../gencomponents/user"

export async function getQuery(type: string, ref: string, value: string) : Promise<User | null> {
    const response: any = await fetch(`http://localhost:3232/database?command=QUERY&type=${type}&${ref}=${value}`);
    const json = await response.json();
    console.log(json.result)
    if (json.result == "success.") {
        console.log(json)
        return json.User;
    } else {
        return null;
    }
}

export async function addUserToDatabase(user: User) {
    const response = await fetch(`http://localhost:3232/database?command=ADD&type=USER&email=${user.email}&username=${user.username}&name=${user.name}&profilePic=${user.profilePic}&tags=${user.tags}`);
}