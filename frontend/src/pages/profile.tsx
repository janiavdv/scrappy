import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import User from "../gencomponents/user";
import Header from "../gencomponents/header";
import UploadImageToS3WithReactS3 from "../gencomponents/awsupload";
import ControlledInput from "../gencomponents/controlledinput";
import Footer from "../gencomponents/footer";
import { PageProps } from "../gencomponents/pagecomponent";
import { Book as BookReact, createDefaultBook } from "../gencomponents/book";
import BookObject from "../gencomponents/BookObject";
import Entry from "../gencomponents/EntryObject";
import { addEntryToDatabase, getBookListFromDatabase } from "../utils/dbutils";

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

  const [allowed, setAllowed] = useState<boolean>(false);

  if (!display) {
    return null;
  }

  return (
    <div id="modal">
      <div id="log-modal">
        <h3>Enter the title and body for your page!</h3>
        <label>
          Title
          <ControlledInput
            value={titleValue}
            setValue={setTitleValue}
            ariaLabel={TEXT_text_box_accessible_name}
            spaces={true}
          />
        </label>
        <br />
        <label>
          Caption
          <ControlledInput
            value={bodyValue}
            setValue={setBodyValue}
            ariaLabel={TEXT_text_box_accessible_name}
            spaces={true}
          />
        </label>
        <label>
          Add a hashtag!
          <ControlledInput
            value={tagValue}
            setValue={setTagValue}
            ariaLabel={TEXT_text_box_accessible_name}
            spaces={false}
          />
        </label>

        <UploadImageToS3WithReactS3
          setValue={setLink}
          setAllowed={setAllowed}
        />
        <br />
        <hr></hr>
        <span>
          <button
            type="submit"
            value="Post"
            onClick={async () => {
              if (titleValue !== "" && bodyValue !== "" && allowed) {
                const pg: PageProps = {
                  title: titleValue,
                  body: bodyValue,
                  img: imageLink,
                  hashtag: tagValue,
                };
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
            Post
          </button>
        </span>
        <span>
          <button
            className="close-button"
            onClick={() => {
              setDisplay(false);
            }}
          >
            {" "}
            Close
          </button>
        </span>
      </div>
    </div>
  );
}

export const TEXT_text_box_accessible_name = "Text Box for Information Entry.";

export default function Profile() {
  const user: User = useLocation().state;
  const [todayBook, setBook] = useState<BookObject | null>(null);

  useEffect(() => {
    if (todayBook == null) {
      console.log("im being called");
      getBookListFromDatabase(user).then((booklist) => {
        if (booklist.length !== 0) {
          for (let i = 0; i < booklist.length; i++) {
            if (
              booklist[i].date ==
              new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            ) {
              console.log("i match!");
              setBook(booklist[i]);
            }
          }
        } else {
          createDefaultBook(user).then((b) => {
            setBook(b);
          });
        }
      });
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
            <button>Today's Book</button>
            <button>Past Books</button>
          </div>
          <hr></hr>
          <div id="today-book">
            {todayBook && (
              <BookReact bookObject={todayBook} user={user} setBook={setBook} />
            )}
          </div>
        </div>
        <div id="right-bar-profile">
          <div id="profile-friends-list">
            <p>Friends</p>
            <hr></hr>
          </div>
          <div id="create-page">
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
