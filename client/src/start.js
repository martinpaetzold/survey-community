import ReactDOM from "react-dom";
import Welcome from "./welcome.js";
import App from "./App.js";

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
