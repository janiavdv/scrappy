import { useEffect, useState } from "react";
import Entry from "../interfaces/EntryObject";
import { grabOrderedFriendPosts } from "../utils/dbutils";
import Friend from "./friendcomponent";
import Loading from "./loading";

interface FriendPostProps {
  friendList: Friend[] | null;
}

export default function FriendPosts({ friendList }: FriendPostProps) {
  const [friendPosts, setPosts] = useState<Entry[] | null>(null);

  useEffect(() => {
    if (friendList != null) {
      console.log("help");
      grabOrderedFriendPosts(friendList).then((lst) => setPosts(lst));
    }
  }, []);

  return (
    <div id="friend-post-section">
      <div>
        {friendPosts ? (
          friendPosts.map((post) => <p>{post.caption}</p>)
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
