import { Dispatch, SetStateAction, useState } from "react";
import {
  addNewFriend,
  getQuery,
  removeFriendFromDatabase,
} from "../utils/dbutils";
import Loading from "./loading";
import User from "../interfaces/user";
import { request } from "express";

export interface FriendComponentProps {
  friendUsername: string;
  requestList?: Friend[] | null;
  friendList: Friend[] | null;
  image: string;
  setFriends: Dispatch<SetStateAction<Friend[] | null>>;
  setRequests?: Dispatch<SetStateAction<Friend[] | null>>;
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
              removeFriendFromDatabase(user, friendUsername, false);
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

function RequestComponent({
  user,
  friendUsername,
  image,
  friendList,
  requestList,
  setFriends,
  setRequests,
}: FriendComponentProps) {
  const [clicked, setClick] = useState<boolean>(false);
  const [rClicked, setRClick] = useState<boolean>(false);

  return (
    <div className="request-in-list">
      <div className="request-info">
        <img
          src={image}
          className="request-profile-pic"
          referrerPolicy="no-referrer"
        />
        <p>{friendUsername}</p>
      </div>

      <div className="request-buttons">
        <button
          className={"deny-request-button"}
          onClick={() => {
            if (!clicked) {
              setClick(true);
            } else {
              if (requestList) {
                let newList = requestList.filter(
                  (el) => el.username != friendUsername
                );
                if (setRequests) {
                  setRequests(newList);
                }
                removeFriendFromDatabase(user, friendUsername, true);
              }
            }
          }}
        >
          {clicked ? "Confirm Denial" : "Deny"}
        </button>
        <button
          className={"accept-request-button"}
          onClick={() => {
            if (!rClicked) {
              setRClick(true);
            } else {
              if (requestList) {
                let newList = requestList.filter(
                  (el) => el.username != friendUsername
                );
                if (setRequests) {
                  setRequests(newList);
                }
                if (friendList) {
                  let newFriend = requestList.filter(
                    (el) => el.username == friendUsername
                  )[0];
                  let newFriendsList = [...friendList, newFriend];
                  setFriends(newFriendsList);
                }
                addNewFriend(user, friendUsername);
              }
            }
          }}
        >
          {rClicked ? "Confirm Acceptance" : "Accept"}
        </button>
      </div>
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
  requestList?: Friend[] | null;
  friendList: Friend[] | null;
  setFriends: Dispatch<SetStateAction<Friend[] | null>>;
  setRequests?: Dispatch<SetStateAction<Friend[] | null>>;
  user: User;
  requests: boolean;
}

export function FriendListComponent({
  friendList,
  requestList,
  setFriends,
  setRequests,
  user,
  requests,
}: FriendListComponent) {
  return (
    <div id={"friends-list"}>
      <h3>{requests ? "Friend Requests" : "Friends"}</h3>
      <hr></hr>
      {requests ? (
        requestList ? (
          requestList.map((request) => (
            <RequestComponent
              image={request.image}
              friendUsername={request.username}
              user={user}
              key={request.username}
              setFriends={setFriends}
              setRequests={setRequests}
              requestList={requestList}
              friendList={friendList}
            />
          ))
        ) : (
          <Loading />
        )
      ) : friendList ? (
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
