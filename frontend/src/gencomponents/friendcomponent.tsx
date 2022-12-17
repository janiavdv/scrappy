import { Dispatch, SetStateAction, useState } from "react";
import { getQuery, removeFriendFromDatabase } from "../utils/dbutils";
import Loading from "./loading";
import User from "../interfaces/user";

export interface FriendComponentProps {
  friendUsername: string;
  friendList: Friend[] | null;
  image: string;
  setFriends: Dispatch<SetStateAction<Friend[] | null>>;
  user: User;
}

export default interface Friend {
  username: string;
  image: string;
}

export function FriendComponent({
  user,
  friendUsername,
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
      <p>{friendUsername}</p>
      <button
        className={"remove-friend-button"}
        onClick={() => {
          if (!clicked) {
            setClick(true);
          } else {
            if (friendList) {
              let newList = friendList.filter(
                (el) => el.username != friendUsername
              );
              setFriends(newList);
              removeFriendFromDatabase(user, friendUsername);
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

export function FriendSearchResult({ username, image }: Friend) {
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
  friendList: Friend[] | null;
  setFriends: Dispatch<SetStateAction<Friend[] | null>>;
  extended: boolean;
  user: User;
}

export function FriendListComponent({
  friendList,
  setFriends,
  extended,
  user,
}: FriendListComponent) {
  return (
    <div id={extended ? "friends-friends-list" : "profile-friends-list"}>
      <h3>Friends</h3>
      <hr></hr>
      {friendList ? (
        friendList.map((friend) => (
          <FriendComponent
            image={friend.image}
            friendUsername={friend.username}
            user={user}
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

export async function grabFriends(user: User): Promise<Friend[]> {
  let userdata = await getQuery("USERNAME", "username", user.username);

  if (userdata != null) {
    let fList: string[] = userdata.friendsList;
    let fComponentList: Friend[] = [];
    for (let i = 0; i < fList.length; i++) {
      let friendInfo = await getQuery("USERNAME", "username", fList[i]);
      if (friendInfo != null) {
        let fComponent: Friend = {
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
