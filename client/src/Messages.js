import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import ProfilePic from "./ProfilePicture.js";
import { getPrivateMessages, sendPrivateMessage } from "./actions.js";

export default function Messages(props) {
    const dispatch = useDispatch();
    const chatMessages = useSelector((state) => state && state.privateMessages);
    const userId = useSelector((state) => state && state.id);
    const elemRef = useRef("");
    const otherId = props.match.params.id;

    useEffect(() => {
        dispatch(getPrivateMessages(otherId));
    }, []);

    useEffect(() => {
        if (elemRef.current) {
            elemRef.current.scrollTop = elemRef.current.scrollHeight;
        }
    }, [chatMessages]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            //console.log("MESSAGE: ", e.target.value);
            dispatch(sendPrivateMessage(e.target.value, otherId));
            e.target.value = null;
        }
    };

    if (!chatMessages) {
        return <p>Loading</p>;
    }

    return (
        <>
            <h2>Private Messages</h2>
            <div className="private-message-wrapper">
                <ul className="private-message-container" ref={elemRef}>
                    {chatMessages.map((message) => (
                        <li className="private-message-full" key={message.id}>
                            {message.user == userId && (
                                <div className="user-self">
                                    <span>{message.message_text} </span>
                                    <img
                                        className="profile-img-chat"
                                        src={message.profile_picture_url}
                                        alt={`${message.firstname} ${message.lastname}`}
                                    />
                                    You, {message.time}
                                </div>
                            )}
                            {message.user != userId && (
                                <div className="user-other">
                                    <span>{message.message_text} </span>
                                    <img
                                        className="profile-img-chat"
                                        src={message.profile_picture_url}
                                        alt={`${message.firstname} ${message.lastname}`}
                                    />
                                    {message.firstname}, {message.time}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <textarea
                className="chat-textarea"
                onKeyDown={handleKeyDown}
                placeholder="Write your message"
            />
        </>
    );
}
