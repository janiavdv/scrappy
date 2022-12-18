import { isValidElement, useEffect, useState } from "react";
import Entry from "../interfaces/EntryObject";
import { grabOrderedFriendPosts } from "../utils/dbutils";
import Friend from "./friendcomponent";
import Loading from "./loading";

interface PostProps {
  caption: string;
  title: string;
  time: string;
  image: string;
  tag: string;
  friend: Friend;
}

function Post({ caption, title, tag, image, time, friend }: PostProps) {
  return (
    <div className="post">
      <div className="friend-post-top-bar">
        <div className="friend-post-info">
          <img
            src={friend.image}
            className="friend-profile-pic"
            referrerPolicy="no-referrer"
          />
          <p>{friend.username}</p>
        </div>
        <p>{time}</p>
      </div>
      <hr></hr>
      <div>
        <img className="post-image" src={image} />
      </div>
      <hr></hr>
      <div className="friend-post-bottom-bar">
        <div className="post-content-info">
          <p>{title}</p>
          <p className="hashtag">{"#" + tag}</p>
        </div>
        <blockquote className="post-caption">{caption}</blockquote>
      </div>
    </div>
  );
}

interface FriendPostProps {
  friendList: Friend[] | null;
}

export default function FriendPosts({ friendList }: FriendPostProps) {
  const [friendPosts, setPosts] = useState<Entry[] | null>(null);

  useEffect(() => {
    if (friendList != null) {
      grabOrderedFriendPosts(friendList).then((lst) => setPosts(lst));
    } else {
      console.log("no friends");
    }
  }, []);

  return (
    <div id="friend-post-section">
      {friendPosts ? (
        friendPosts.map((post) => (
          <Post
            friend={
              friendList
                ? friendList.filter((el) => el.username == post.user)[0]
                : { username: "not found", image: "" }
            }
            caption={post.caption}
            title={post.title}
            time={post.time}
            key={post.caption}
            image={post.imageLink}
            tag={post.tag}
          />
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
}

export function GalleryPosts() {
  const [galleryOrder, setGalleryOrder] = useState<Entry[] | null>(null); // this is the object we feed the ordered list of posts into
  
  return (
    <div id="friend-post-section">
      {galleryOrder ? (
        galleryOrder.map((post) => (
          <Post
            friend={
              post.user
                ? { username: "found", image: ""} // need fetching here to show the user's info
                : { username: "not found", image: "" }
            }
            caption={post.caption}
            title={post.title}
            time={post.time}
            key={post.caption}
            image={post.imageLink}
            tag={post.tag}
          />
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
}
