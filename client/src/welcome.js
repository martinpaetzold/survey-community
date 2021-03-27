import React from "react";
import Registration from "./Registration.js";
import Login from "./Login.js";
import ResetPassword from "./ResetPassword.js";
import Navbar from "./components/NavbarStart.js";
import { HashRouter, Route } from "react-router-dom";

export default function Welcome() {
    return (
        <div>
            <Navbar />
            <h1>Welcome to my social network</h1>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset-password" component={ResetPassword} />
                </div>
            </HashRouter>
        </div>
    );
}
