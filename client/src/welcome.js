import React from "react";
import Registration from "./Registration.js";
import Login from "./Login.js";
import ResetPassword from "./ResetPassword.js";
import Navbar from "./components/NavbarStart.js";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

import { HashRouter, Route } from "react-router-dom";

export default function Welcome() {
    return (
        <div>
            <Container className="p-3">
                <Navbar />
                <Jumbotron>
                    <h1 className="jumbo">Welcome to my social network</h1>
                </Jumbotron>
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                        <Route
                            path="/reset-password"
                            component={ResetPassword}
                        />
                    </div>
                </HashRouter>
            </Container>
        </div>
    );
}
