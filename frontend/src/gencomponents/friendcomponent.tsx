import { getQuery } from "../utils/dbutils";
import User from "./user";

export default interface FriendComponent {
  username: string;
  image: string;
}

export function FriendComponent({username, image}: FriendComponent) {
  return (
    <div>
      <img src={image}/>
      <p>{username}</p>
    </div>
  )

}

export async function grabFriendComponents(
  user: User
): Promise<FriendComponent[]> {
  let userdata = await getQuery("USERNAME", "username", user.username);

  if (userdata != null) {
    let fList: string[] = userdata.friendsList;
    let fComponentList: FriendComponent[] = [];
    for (let i = 0; i < fList.length; i++) {
      let friendInfo = await getQuery("USERNAME", "username", fList[i]);
      if (friendInfo != null) {
        let fComponent: FriendComponent = {
          username: friendInfo.username,
          image: friendInfo.profilePic,
        };
        fComponentList.push(fComponent);
      }
    }
    console.log(fComponentList);
    return fComponentList;
  } else {
    return [];
  }
}
