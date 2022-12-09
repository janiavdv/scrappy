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
                    if (titleValue != "" && bodyValue != "" && allowed) {
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
        picture: st.picture,
        taglist: st.taglist
    })
    const [modalDisplay, setModalDisplay] = useState<boolean>(false) // For controlling the user textbox.
    const [pages, setPages] = useState<PageProps[]>([])

    return (
        <div>
            <Header user={user} />
            <div id="profile-page">
                <div id="prof-info-box">
                    <p>{user.name}</p>
                    <p>{user.username}</p>

                    <p>{user.email}</p>
                    <img src={user.picture} id="big-profile-pic" referrerPolicy="no-referrer" />
                    <p>Interests:</p>
                    <hr></hr>
                    <div id="interests">
                        {st.taglist.map((tag) => (
                            <div className="profile-tag">
                                <p>{tag}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div id="book-menu">
                    <div id="book-buttons">
                        <button>Today's Book</button>
                        <button>Past Books</button>
                        <button>Shared Books</button>
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
            <Footer />
        </div>

    )
}
