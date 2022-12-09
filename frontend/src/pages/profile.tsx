import { useState } from "react";
import { useLocation } from "react-router-dom";
import User from "../gencomponents/user";
import Header from '../gencomponents/header';
import UploadImageToS3WithReactS3 from "../gencomponents/awsupload";
import ControlledInput from '../gencomponents/controlledinput';
import Footer from "../gencomponents/footer";
import { useNavigate } from "react-router-dom";


// interface Book {
//     title: string,
//     pages: [Page]
// }

interface Page {
    title: string,
    body: string
}

interface ModalProps {
    pageTitle: string,
    pageBody: string,
    display: boolean
}

function LogModal({ pageTitle, pageBody, display }: ModalProps) {
    const [titleValue, setTitleValue] = useState<string>("") // For controlling the title textbox.
    const [bodyValue, setBodyValue] = useState<string>("") // For controlling the body textbox.

    const st: User = useLocation().state
    const navigate = useNavigate();

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
                    Body
                    <ControlledInput value={bodyValue} setValue={setBodyValue} ariaLabel={TEXT_text_box_accessible_name} spaces={true} />
                </label>
                <br />
                <hr></hr>
                <button type="submit" value="Post" onClick={() => {
                    if (titleValue != "" && bodyValue != "") {
                        const pg: Page = {
                            title: titleValue,
                            body: bodyValue
                        }
                        // addUserToDatabase(user); (TODO: add to history)
                        // navigate("/profile:" + st.username, { state: st })
                        navigate("/friends", { state: st }) // TODO: change this
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


    return (
        <div>
            <Header user={user} />
            <div id="profile-page">
                <div id="prof-info-box">
                    <p>{user.name}</p>
                    <p>{user.username}</p>

                    <p>{user.email}</p>
                    <img src={user.picture} id="big-profile-pic" referrerPolicy="no-referrer"/>
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
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam pellentesque nec nam aliquam. Vitae justo eget magna fermentum iaculis eu non diam phasellus. Vitae justo eget magna fermentum iaculis eu non diam. Sed arcu non odio euismod lacinia at. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam. Cras fermentum odio eu feugiat pretium nibh ipsum. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. Eget aliquet nibh praesent tristique magna sit. In ornare quam viverra orci sagittis eu volutpat odio facilisis. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis.

                            Velit ut tortor pretium viverra suspendisse potenti. Praesent elementum facilisis leo vel fringilla. Rhoncus urna neque viverra justo nec ultrices dui sapien eget. Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Scelerisque viverra mauris in aliquam sem fringilla ut morbi. Quam viverra orci sagittis eu. Velit laoreet id donec ultrices tincidunt arcu non sodales. Libero volutpat sed cras ornare arcu dui. Non diam phasellus vestibulum lorem. Nulla at volutpat diam ut. Nibh venenatis cras sed felis eget velit aliquet. Risus quis varius quam quisque id. Tempus iaculis urna id volutpat lacus laoreet non. Massa sapien faucibus et molestie ac. Eu turpis egestas pretium aenean. Adipiscing tristique risus nec feugiat. Faucibus pulvinar elementum integer enim. Nibh cras pulvinar mattis nunc sed blandit libero volutpat.

                            Lacus luctus accumsan tortor posuere ac ut consequat semper viverra. Nunc consequat interdum varius sit amet. Justo laoreet sit amet cursus sit. Adipiscing commodo elit at imperdiet dui. Duis ut diam quam nulla porttitor. Purus sit amet volutpat consequat mauris. Nec ultrices dui sapien eget mi proin sed libero enim. Nisl vel pretium lectus quam id leo in vitae. Tristique risus nec feugiat in fermentum. Fermentum dui faucibus in ornare quam viverra orci sagittis. Ornare quam viverra orci sagittis eu volutpat odio facilisis.

                            Quam viverra orci sagittis eu volutpat odio facilisis. Sollicitudin nibh sit amet commodo. Facilisis volutpat est velit egestas dui id. Volutpat commodo sed egestas egestas fringilla. Lorem ipsum dolor sit amet consectetur adipiscing. In metus vulputate eu scelerisque felis. A arcu cursus vitae congue mauris rhoncus aenean vel elit. Viverra mauris in aliquam sem fringilla ut morbi tincidunt. Vel pretium lectus quam id leo in vitae. A erat nam at lectus. Morbi leo urna molestie at elementum eu facilisis.

                            Vitae nunc sed velit dignissim sodales ut eu. Id interdum velit laoreet id donec. Augue ut lectus arcu bibendum at varius vel. Sodales ut eu sem integer vitae. Ornare quam viverra orci sagittis eu volutpat. Sit amet nulla facilisi morbi tempus iaculis urna. Amet nisl purus in mollis nunc sed. Dignissim enim sit amet venenatis urna cursus. Morbi tempus iaculis urna id volutpat lacus laoreet non. Vulputate odio ut enim blandit volutpat maecenas volutpat. Dui ut ornare lectus sit. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae.

                            Ac orci phasellus egestas tellus rutrum tellus pellentesque. Consectetur adipiscing elit ut aliquam purus sit amet. Libero volutpat sed cras ornare arcu dui vivamus arcu. Nibh praesent tristique magna sit. Senectus et netus et malesuada fames ac turpis egestas integer. Risus viverra adipiscing at in. Quisque sagittis purus sit amet volutpat consequat mauris nunc congue. Adipiscing tristique risus nec feugiat in fermentum. Diam maecenas sed enim ut sem. Netus et malesuada fames ac turpis. Mauris augue neque gravida in fermentum et sollicitudin. Massa massa ultricies mi quis hendrerit. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada.
                        </p>
                    </div>

                </div>
                <div>
                    <div id="profile-friends-list">
                    <p>Friends</p>
                    <hr></hr>
                    </div>
                    <div id="newPageButton"> 
                        <button type="submit" value="New Page" onClick={() => {
                            setModalDisplay(true)
                        }}
                        >New Page</button>
                    </div>
                </div>
                <LogModal pageTitle={""} pageBody={""} display={modalDisplay}></LogModal>
            </div>


            {/* <UploadImageToS3WithReactS3 /> */}
            <Footer />
        </div>

    )
    }
