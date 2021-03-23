import io from "socket.io-client";
import { getMostRecentChatmessages, newMessage } from "./actions.js";

export let socket;
export const init = (store) => {
    if (!socket) {
        socket = io.connect();
        socket.on("GET_CHAT_MESSAGES", (messages) => {
            store.dispatch(getMostRecentChatmessages(messages));
        });
        socket.on("POST_CHAT_MESSAGES", (message) => {
            store.dispatch(newMessage(message));
        });
    }
};
