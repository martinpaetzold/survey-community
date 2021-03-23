import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxPromise from "redux-promise";
import reducer from "./reducer.js";
import { chatMessages, chatMessage } from "./actions.js";
import { io } from "socket.io-client";
import Welcome from "./welcome.js";
import App from "./App.js";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

// socket.io

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (messages) =>
            store.dispatch(chatMessages(messages))
        );

        socket.on("chatMessage", (message) =>
            store.dispatch(chatMessage(message))
        );
    }
};

init(store);

if (location.pathname === "/welcome") {
    ReactDOM.render(<Welcome />, document.querySelector("main"));
} else {
    let provider = (
        <Provider store={store}>
            <App />
        </Provider>
    );
    ReactDOM.render(provider, document.querySelector("main"));
}
