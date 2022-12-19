import { useEffect, useState } from "react";
import Entry from "../interfaces/EntryObject";
import User from "../interfaces/user";
import { getOrderedGallery, grabOrderedFriendPosts } from "../utils/dbutils";
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
  if (friend) {

    const TEXT_friend_info = `This post was made by ${friend.username} at ${time}.`
    const TEXT_image_description = `Here is the image.`
    const TEXT_content_info = `The title of this post is ${title} and the caption 
    reads ${caption}. The hashtag is ${tag}.`

    return (
      <div className="post">
        <div className="friend-post-top-bar">
          <div className="friend-post-info" aria-label={TEXT_friend_info}>
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
        <div aria-label={TEXT_image_description}>
          <img className="post-image" src={image} />
        </div>
        <hr></hr>
        <div className="friend-post-bottom-bar">
          <div className="post-content-info" aria-label={TEXT_content_info}>
            <p>{title}</p>
            <p className="hashtag">{"#" + tag}</p>
          </div>
          <blockquote className="post-caption">{caption}</blockquote>
        </div>
      </div>
    );
  } else {
    return null
  }
}

interface FriendPostProps {
  friendList: Friend[] | null;
}

export default function FriendPosts({ friendList }: FriendPostProps) {
  const [friendPosts, setPosts] = useState<Entry[] | null>(null);

  const TEXT_friend_posts = `Welcome to your friends feed!`

  useEffect(() => {
    if (friendList != null) {
      grabOrderedFriendPosts(friendList).then((lst) => setPosts(lst));
    } else {
      console.log("no friends");
    }
  }, []);

  return (
    <div id="friend-post-section" aria-label={TEXT_friend_posts}>
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

interface GalleryPostProps {
  title: string;
  time: string;
  image: string;
  tag: string;
  username: string;
}

function GalleryPost({ title, time, image, tag, username }: GalleryPostProps) {

  const TEXT_gallery_content = `This post was made by ${username} at ${time}.`
  const TEXT_post_info = `The title of this post is ${title} and the hashtag is
  ${tag}.`

  return (
    <div className="gallery-post">
      <img className="gallery-image" src={image} />
      <div className="gallery-post-bottom-bar">
        <div className="gallery-content-info" aria-label={TEXT_gallery_content}>
          <h4>{username}</h4>
          <p>{time}</p>
        </div>
        <div className="gallery-content-info" aria-label={TEXT_post_info}>
          <p>{title}</p>
          <p className="hashtag">{"#" + tag}</p>
        </div>
      </div>
    </div>
  );
}

interface GalleryProps {
  user: User;
}
export function GalleryPosts({ user }: GalleryProps) {
  const [galleryOrder, setGalleryOrder] = useState<[Entry[]] | null>(null); // this is the object we feed the ordered list of posts into

  useEffect(() => {
    getOrderedGallery(user).then((list) => {
      setGalleryOrder(list);
      console.log(galleryOrder);
    });
  }, []);

  const TEXT_gallery_page=`Welcome to the gallery page!`

  return (
    <div id="gallery-page" aria-label={TEXT_gallery_page}>
      <div id="gallery-info-box">
        <p>Your personal feed, catered to your interests.</p>
      </div>
      <div id="gallery-section">
        {galleryOrder ? (
          galleryOrder.length > 0 ? (galleryOrder.map((postArr) =>
            postArr.map((post) => (
              <GalleryPost
                username={post.user}
                title={post.title}
                time={post.time}
                key={post.caption}
                image={post.imageLink}
                tag={post.tag}
              />
            ))
          )
          ) : ("There are no posts to show today.")
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
