import { Dispatch, SetStateAction, useState } from "react";
import { getQuery } from "../utils/dbutils";
import Loading from "./loading";
import User from "../interfaces/user";

export interface FriendComponentProps {
  username: string;
  friendList: FriendComponent[] | null;
  image: string;
  setFriends: Dispatch<SetStateAction<FriendComponent[] | null>>;
}

export default interface FriendComponent {
  username: string;
  image: string;
}

export function FriendComponentReact({
  username,
  image,
  friendList,
  setFriends,
}: FriendComponentProps) {
  const [clicked, setClick] = useState<boolean>(false);

  return (
    <div className="friend-in-list">
      <img
        src={image}
        className="friend-profile-pic"
        referrerPolicy="no-referrer"
      />
      <p>{username}</p>
      <button
        className={"remove-friend-button"}
        onClick={() => {
          if (!clicked) {
            setClick(true);
          } else {
            if (friendList) {
              let newList = friendList.filter((el) => el.username != username);
              setFriends(newList);
              // actually take out of the database!
            }
          }
        }}
      >
        {clicked ? "Confirm Deletion" : "X"}
      </button>
    </div>
  );
}

export function FriendComponentSearch({ username, image }: FriendComponent) {
  return (
    <div className="friend-in-list">
      <img
        src={image}
        className="friend-profile-pic"
        referrerPolicy="no-referrer"
      />
      <p>{username}</p>
    </div>
  );
}

export interface FriendListComponent {
  friendList: FriendComponent[] | null;
  setFriends: Dispatch<SetStateAction<FriendComponent[] | null>>;
  extended: boolean;
}

export function FriendListComponent({
  friendList,
  setFriends,
  extended,
}: FriendListComponent) {
  return (
    <div id={extended ? "friends-friends-list" : "profile-friends-list"}>
      <h3>Friends</h3>
      <hr></hr>
      {friendList ? (
        friendList.map((friend) => (
          <FriendComponentReact
            image={friend.image}
            username={friend.username}
            key={friend.username}
            setFriends={setFriends}
            friendList={friendList}
          />
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
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
