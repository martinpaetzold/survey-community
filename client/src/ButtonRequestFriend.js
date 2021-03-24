import { useState, useEffect } from "react";
import axios from "./axios.js";

const STATUS_NO_REQUEST = "no-request";
const STATUS_REQUEST_MADE_BY_YOU = "request-made-by-you";
const STATUS_REQUEST_MADE_TO_YOU = "request-made-to-you";
const STATUS_ACCEPTED = "request-accepted";

const ACTION_MAKE_REQUEST = "make-request";
const ACTION_CANCEL_REQUEST = "cancel";
const ACTION_ACCEPT_REQUEST = "accept";
const ACTION_UNFRIEND = "unfriend";

export default function ButtonRequestFriend(props) {
    console.log("btn request friend", props);
    const { userIdOther } = props;
    const [status, setStatus] = useState();
    console.log("other uid", userIdOther);

    useEffect(async () => {
        await axios
            .get("/api/requests/friends/" + userIdOther)
            .then((response) => {
                const { status } = response.data;
                setStatus(status);
            })
            .catch((error) => {
                console.log("error /api/requests/friends/", error);
            });
    }, [userIdOther]);

    const sendAction = async (action) => {
        const response = await axios.post(
            "/api/requests/friends/" + action + "/" + userIdOther
        );
        const { newStatus } = response.data;
        setStatus(newStatus);
    };

    if (status == STATUS_NO_REQUEST) {
        return (
            <button
                className="button-friend-request"
                onClick={(e) => sendAction(ACTION_MAKE_REQUEST)}
            >
                Make request
            </button>
        );
    } else if (status == STATUS_ACCEPTED) {
        return (
            <button
                className="button-friend-request"
                onClick={(e) => sendAction(ACTION_UNFRIEND)}
            >
                Unfriend
            </button>
        );
    } else if (status == STATUS_REQUEST_MADE_BY_YOU) {
        return (
            <button
                className="button-friend-request"
                onClick={(e) => sendAction(ACTION_CANCEL_REQUEST)}
            >
                Cancel request
            </button>
        );
    } else if (status == STATUS_REQUEST_MADE_TO_YOU) {
        return (
            <button
                className="button-friend-request"
                onClick={(e) => sendAction(ACTION_ACCEPT_REQUEST)}
            >
                Accept
            </button>
        );
    } else {
        return (
            <button
                className="button-friend-request"
                onClick={(e) => sendAction(ACTION_MAKE_REQUEST)}
            >
                Status loading..
            </button>
        );
    }
}
