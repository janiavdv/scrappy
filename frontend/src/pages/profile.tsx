import { Dispatch, SetStateAction, useState } from 'react'; import { useLocation } from "react-router-dom";
import User from "../gencomponents/user";
import Header from '../gencomponents/header';
import UploadImageToS3WithReactS3 from "../gencomponents/awsupload";
import ControlledInput from '../gencomponents/controlledinput';
import Footer from "../gencomponents/footer";
import { PageProps } from '../gencomponents/pagecomponent';
import { Book } from '../gencomponents/book';

interface PageModalProps {
    display: boolean
    setDisplay: Dispatch<SetStateAction<boolean>>
    pages: PageProps[],
    setPages: Dispatch<SetStateAction<PageProps[]>>
}

function PageModal({ display, setDisplay, pages, setPages }: PageModalProps) {
    const [titleValue, setTitleValue] = useState<string>("") // For controlling the title textbox.
    const [bodyValue, setBodyValue] = useState<string>("") // For controlling the body textbox.
    const [imageLink, setLink] = useState<string>("") // For controlling the body textbox.
    const [tagValue, setTagValue] = useState<string>("") // For controlling the body textbox.

    const [allowed, setAllowed] = useState<boolean>(false)

    const st: User = useLocation().state

    if (!display) { return null; }

    return (
        <div id="modal">
            <div id="log-modal">
                <h3>Enter the title and body for your page!</h3>
                <label>
                    Title
                    <ControlledInput value={titleValue} setValue={setTitleValue} ariaLabel={TEXT_text_box_accessible_name} spaces={true} />
                </label>
                <br />
                <label>
                    Caption
                    <ControlledInput value={bodyValue} setValue={setBodyValue} ariaLabel={TEXT_text_box_accessible_name} spaces={true} />
                </label>
                <label>
                    Add a hashtag!
                    <ControlledInput value={tagValue} setValue={setTagValue} ariaLabel={TEXT_text_box_accessible_name} spaces={false} />
                </label>

                <UploadImageToS3WithReactS3 setValue={setLink} setAllowed={setAllowed} />
                <br />
                <hr></hr>
                <button type="submit" value="Post" onClick={() => {
                    if (titleValue !== "" && bodyValue !== "" && allowed) {
                        const pg: PageProps = {
                            title: titleValue,
                            body: bodyValue,
                            img: imageLink,
                            hashtag: tagValue
                        }
                        setPages([...pages, pg])
                        setDisplay(false)
                    }
                }} >Post</button>
            </div>
        </div>
    )
}


export const TEXT_text_box_accessible_name = "Text Box for Information Entry.";

export default function Profile() {
    const st: User = useLocation().state
    const [user, setUser] = useState<User>({
        name: st.name,
        email: st.email,
        username: st.username,
        profilePic: st.profilePic,
        tags: st.tags
    })
    const [modalDisplay, setModalDisplay] = useState<boolean>(false) // For controlling the user textbox.
    const [pages, setPages] = useState<PageProps[]>([])

    // at this point, the book is empty and has no pages. oh no.

    // we check if the person has a book for the day yet, if they do great,
    // we pull all those entries (which should be ID'ed, under that ID'd book)
    // and we populate the book

    // if the person doesn't have a book, we create the reference in the database, and make the default
    // intereface for the day we do for everyone, and add it as the header

    // when updating the book and adding more entries, we first save the reference, (which should include a date)
    // grab the same date book in the databse under the user (which, should be done by date), which should give us
    // the id to a book object in the database. then we add the entry to that book object!
    return (
        <div>
            <Header user={user} />
            <div id="profile-page">
                <div id="prof-info-box">
                    <p>{user.name}</p>
                    <p>{user.username}</p>

                    <p>{user.email}</p>
                    <img src={user.profilePic} id="big-profile-pic" referrerPolicy="no-referrer" />
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
                        <Book pages={pages} setPages={setPages} />
                    </div>

                </div>
                <div id="right-bar-profile">
                    <div id="profile-friends-list">
                        <p>Friends</p>
                        <hr></hr>
                    </div>
                    <div id="create-page">
                        <h3>Add to today's book!</h3>
                        <button type="submit" value="New Page" onClick={() => { setModalDisplay(true) }}>New Page</button>
                    </div>
                </div>
                <PageModal display={modalDisplay} setDisplay={setModalDisplay} pages={pages} setPages={setPages} />
            </div>
            <Footer user={user}/>
        </div>

    )
}
