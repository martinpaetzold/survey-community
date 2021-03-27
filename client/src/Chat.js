import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { socket } from "./start.js";

export default function Chat() {
    const dispatch = useDispatch();
    const [draft, setDraft] = useState("");
    const messages = useSelector((state) => state.messages);

    console.log("messages: ", messages);

    const handleButtonOnClick = () => {
        socket.emit("newMessage", draft);
        setDraft("");
    };

    return (
        <div className="chat">
            <h1>Chat</h1>

            <div className="message-wrap">
                {messages &&
                    messages.map((message) => (
                        <Message {...message} key={message.message_id} />
                    ))}
            </div>

            <div>
                <input
                    onChange={(e) => setDraft(e.target.value)}
                    value={draft}
                    placeholder="Type your message.."
                    className="message-input"
                />
                <Button
                    onClick={(e) => handleButtonOnClick()}
                    className="message-button-send"
                >
                    Send
                </Button>
            </div>
        </div>
    );
}

function Message(props) {
    return (
        <div className="message">
            <Link to={"/user/" + props.user_id} target="_blank">
                <img
                    className="profile-img-chat"
                    src={props.profile_picture_url}
                    alt={`${props.firstname} ${props.lastname}`}
                />
            </Link>
            <span>{props.firstname}</span>
            <strong> {props.message_text}</strong>
        </div>
    );
}
