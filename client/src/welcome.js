import React from "react";
import Registration from "./Registration.js";
import Login from "./Login.js";
import ResetPassword from "./ResetPassword.js";
import Navbar from "./components/NavbarStart.js";
import { Container, Row, Col } from "react-bootstrap";
import { HashRouter, Route } from "react-router-dom";

export default function Welcome() {
    return (
        <div className="welcome-site">
            <Navbar />
            <Container className="welcome-image align-items-center">
                <h1 className="jumbo">Welcome to my social network</h1>
            </Container>
            <Container>
                <Row className="position-relative w-100 align-items-center">
                    <Col>
                        <HashRouter>
                            <div>
                                <Route exact path="/" component={Login} />
                                <Route
                                    path="/register"
                                    component={Registration}
                                />
                                <Route
                                    path="/reset-password"
                                    component={ResetPassword}
                                />
                            </div>
                        </HashRouter>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
