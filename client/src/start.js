import ReactDOM from "react-dom";
import Welcome from "./welcome.js";

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <h2>AWESOME! A new social network is born.</h2>;
}

ReactDOM.render(elem, document.querySelector("main"));
