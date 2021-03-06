import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "./axios.js";
import { Form, Button, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            view: 0,
        };
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state in handleChange: ")
        );
    }

    sendCode(e) {
        console.log("handleClick ", this.state);
        e.preventDefault();
        axios
            .post("/user/reset-password/start", this.state)
            .then(({ data }) => {
                console.log("data ", data);
                if (!data.success) {
                    this.setState({
                        error: true,
                    });
                } else {
                    this.setState({
                        view: 1,
                    });
                }
            })
            .catch((error) => {
                console.log(
                    "error on post /user/reset-password/start: ",
                    error
                );
                this.setState({
                    error: true,
                });
            });
    }

    resetPassword(e) {
        console.log("handleClick ", this.state);
        e.preventDefault();
        axios
            .post("/user/reset-password/add-new", this.state)
            .then(({ data }) => {
                console.log("res ", data);
                if (!data.success) {
                    this.setState({
                        error: true,
                    });
                } else {
                    this.setState({
                        view: 2,
                    });
                }
            })
            .catch((error) => {
                console.log(
                    "error on post /user/reset-password/add-new: ",
                    error
                );
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        if (this.state.view === 2) {
            return (
                <div className="ResetPWD">
                    <Col lg={12} className="ResetPWD-Col">
                        <div className="loginField">
                            <h1>Reset Password</h1>
                            {this.state.error && (
                                <p className="errorMessage">
                                    Something went wrong. Please try again
                                </p>
                            )}
                            <div className="formField">
                                <h3>Success!</h3>
                                <Link to="/">Log in!</Link>
                            </div>
                        </div>
                    </Col>
                </div>
            );
        } else if (this.state.view === 1) {
            return (
                <div className="ResetPWD">
                    <Col lg={12} className="ResetPWD-Col">
                        <div className="loginField">
                            <h1>Reset Password</h1>
                            {this.state.error && (
                                <p className="errorMessage">
                                    Something went wrong. Please try again
                                </p>
                            )}
                            <div className="formField">
                                <label>
                                    Resetcode
                                    <input
                                        onChange={(e) => this.handleChange(e)}
                                        name="resetCode"
                                        placeholder="Resetcode"
                                        type="text"
                                    />
                                </label>
                                <label>
                                    Password
                                    <input
                                        onChange={(e) => this.handleChange(e)}
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                    />
                                </label>
                                <Button
                                    size="lg"
                                    block
                                    onClick={(e) => this.resetPassword(e)}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </Col>
                </div>
            );
        } else {
            return (
                <div className="ResetPWD">
                    <Col lg={12} className="ResetPWD-Col">
                        {this.state.error && (
                            <p className="errorMessage">
                                Something went wrong. Please try again
                            </p>
                        )}
                        <Form>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    placeholder="Enter your Email to reset your password."
                                    type="email"
                                    onChange={(e) => this.handleChange(e)}
                                    block
                                />
                            </Form.Group>
                            <Button
                                size="lg"
                                block
                                onClick={(e) => this.sendCode(e)}
                            >
                                Submit
                            </Button>
                        </Form>
                    </Col>
                    <p>
                        <br />
                    </p>
                </div>
            );
        }
    }
}
