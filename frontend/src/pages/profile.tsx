import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import User from "../interfaces/user";
import Header from "../gencomponents/header";
import UploadImageToS3WithReactS3 from "../gencomponents/awsupload";
import ControlledInput from "../gencomponents/controlledinput";
import Footer from "../gencomponents/footer";
import { Book as BookReact, createDefaultBook } from "../gencomponents/book";
import BookObject from "../interfaces/BookObject";
import Entry from "../interfaces/EntryObject";

import {
  addEntryToDatabase,
  getBookListFromDatabase,
  grabFriends,
} from "../utils/dbutils";
import Loading from "../gencomponents/loading";
import FriendComponent, {
  FriendListComponent,
} from "../gencomponents/friendcomponent";

const TEXT_set_privacy = `Click here to set the privacy of the post!`;
const TEXT_submit_button = `Click here to submit the post!`;
const TEXT_close_button = `Click here to close editing the post!`;
const TEXT_todays_button = `Click here to choose today's book!`;
const TEXT_past_button = `Click here to choose a past book!`;
const TEXT_create_page = `This is the create page where you can add to today's post!`;

interface PageModalProps {
  display: boolean;
  setDisplay: Dispatch<SetStateAction<boolean>>;
  book: BookObject | null;
  setBook: Dispatch<SetStateAction<BookObject | null>>;
  user: User;
}

function PageModal({
  display,
  setDisplay,
  book,
  setBook,
  user,
}: PageModalProps) {
  const [titleValue, setTitleValue] = useState<string>(""); // For controlling the title textbox.
  const [bodyValue, setBodyValue] = useState<string>(""); // For controlling the body textbox.
  const [imageLink, setLink] = useState<string>(""); // For controlling the body textbox.
  const [tagValue, setTagValue] = useState<string>(""); // For controlling the body textbox.
  const [privacyValue, setPrivacy] = useState<boolean>(true); // For controlling the body textbox.

  const [allowed, setAllowed] = useState<boolean>(false);

  if (!display) {
    return null;
  }
  return (
    <div id="modal">
      <div id="log-modal">
        <h3>Enter the title and caption for your page!</h3>
        <div id="modal-forms">
          <label htmlFor="title-input">Title:</label>
          <ControlledInput
            value={titleValue}
            setValue={setTitleValue}
            ariaLabel={TEXT_text_box_accessible_name}
            spaces={true}
            id="title-input"
          />
          <label htmlFor="caption-input">Caption:</label>
          <ControlledInput
            value={bodyValue}
            setValue={setBodyValue}
            ariaLabel={TEXT_text_box_accessible_name}
            spaces={true}
            id="caption-input"
          />
          <label htmlFor=""> Add a hashtag!:</label>
          <ControlledInput
            value={tagValue}
            setValue={setTagValue}
            ariaLabel={TEXT_text_box_accessible_name}
            spaces={false}
            id="tag-input"
          />
        </div>
        <br />
        <UploadImageToS3WithReactS3
          setValue={setLink}
          setAllowed={setAllowed}
        />
        <br />
        Your post is, by default, public. This means anyone in the world can see
        it. If you want it just for friends, make it private using the button
        below.
        <br />
        <br />
        <button aria-label={TEXT_set_privacy}
          onClick={() => setPrivacy(!privacyValue)}>
          {privacyValue ? "Privatize" : "Publicize"}
        </button>
        <hr></hr>
        <div id="modal-upload-buttons">
          <button
            aria-label={TEXT_submit_button}

            type="submit"
            value="Post"
            onClick={async () => {
              if (titleValue !== "" && bodyValue !== "" && allowed) {
                if (book != null) {
                  let newBook: BookObject = book;
                  const id: number = new Date().getTime();

                  const newEntry: Entry = {
                    title: titleValue,
                    caption: bodyValue,
                    time: new Date().toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    }),
                    date: new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }),
                    tag: tagValue,
                    imageLink: imageLink,
                    entryID: id.toString(),
                    user: user.username,
                    publicized: privacyValue,
                  };

                  setTitleValue("");
                  setBodyValue("");
                  setTagValue("");
                  setLink("");

                  await addEntryToDatabase(newEntry, book, user.username);

                  newBook.entries.push(newEntry.entryID);
                  setBook(newBook);
                  setDisplay(false);
                }
              }
            }}
          >
            {allowed ? "Post" : "Loading info..."}
          </button>
          <button
            aria-label={TEXT_close_button}
            className="close-button"
            onClick={() => {
              setDisplay(false);
              setTitleValue("");
              setBodyValue("");
              setTagValue("");
              setLink("");
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export const TEXT_text_box_accessible_name = "Text Box for Information Entry.";

export default function Profile() {
  const user: User = useLocation().state;
  const [todayBook, setBook] = useState<BookObject | null>(null);
  const [friendList, setFriends] = useState<FriendComponent[] | null>(null);
  const [pastAlbum, setAlbumBoolean] = useState<boolean>(false);
  const [pastBooks, setPastBooks] = useState<BookObject[]>([]);

  useEffect(() => {
    if (todayBook == null) {
      getBookListFromDatabase(user.username).then((booklist) => {
        let foundbook: boolean = false;
        for (let i = 0; i < booklist.length; i++) {
          if (
            booklist[i].date ===
            new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
          ) {
            foundbook = true;
            setBook(booklist[i]);
          }
        }
        if (foundbook == false) {
          createDefaultBook(user).then((b) => {
            setBook(b);
          });
        }
      });
    }

    if (friendList == null) {
      grabFriends(user, false).then((fList) => setFriends(fList));
    }
  }, []);

  const [modalDisplay, setModalDisplay] = useState<boolean>(false); // For controlling the user textbox.

  return (
    <div>
      <Header user={user} />
      <div id="profile-page">
        <div id="prof-info-box">
          <p>{user.name}</p>
          <p>{user.username}</p>
          <p>{user.email}</p>
          <img
            src={user.profilePic}
            id="big-profile-pic"
            referrerPolicy="no-referrer"
          />
          <p>Interests:</p>
          <hr></hr>
          <div id="interests">
            {user.tags.map((tag) => (
              <div className="profile-tag" key={tag}>
                <p>{tag}</p>
              </div>
            ))}
          </div>
        </div>
        <div id="book-menu">
          <div id="book-buttons">
            <button
              aria-label={TEXT_todays_button}
              onClick={() => {
                setAlbumBoolean(false);
              }}
            >
              Today's Book
            </button>
            <button
              aria-label={TEXT_past_button}
              onClick={async () => {
                setAlbumBoolean(true);
                let bList = await getBookListFromDatabase(user.username);
                bList.reverse();
                setPastBooks(bList);
              }}
            >
              Past Books
            </button>
          </div>
          <hr></hr>
          <div id="today-book">
            {pastAlbum ? (
              <div>
                {pastBooks.map((book) => (
                  <BookReact
                    bookObject={book}
                    user={user}
                    setBook={setBook}
                    key={book.date}
                  />
                ))}
              </div>
            ) : todayBook ? (
              <BookReact
                bookObject={todayBook}
                user={user}
                setBook={setBook}
                key={todayBook.date}
              />
            ) : (
              <Loading />
            )}
          </div>
        </div>
        <div id="right-bar-profile">
          <FriendListComponent
            friendList={friendList}
            setFriends={setFriends}
            user={user}
            requests={false}
          />
          <div id="create-page" aria-label={TEXT_create_page}>
            <h3>Add to today's book!</h3>
            <button
              type="submit"
              value="New Page"
              onClick={() => {
                setModalDisplay(true);
              }}
            >
              New Page
            </button>
          </div>
        </div>
        <PageModal
          display={modalDisplay}
          setDisplay={setModalDisplay}
          book={todayBook}
          setBook={setBook}
          user={user}
        />
      </div>
      <Footer user={user} />
    </div>
  );
}
