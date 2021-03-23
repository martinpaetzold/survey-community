import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
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
                <button
                    onClick={(e) => handleButtonOnClick()}
                    className="message-button-send"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

function Message(props) {
    return (
        <div className="message">
            <span>
                {props.firstname} {props.lastname}
            </span>
            <strong> {props.message_text}</strong>
        </div>
    );
}
