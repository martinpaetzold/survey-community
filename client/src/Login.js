import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "./axios.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    handleChange(e) {
        //it takes the user input and store it in state
        // console.log("event object: ", e);
        // console.log("event object: e.target.value", e.target.value);
        // console.log("event object: e.target.name", e.target.name);

        //add the input's info to state
        this.setState(
            {
                //name of input field: user input field
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state in handleChange: ")
        );
    }

    handleClick(e) {
        console.log("handleClick ", this.state);
        // e.preventDefault();
        axios
            .post("/login", this.state)
            .then(({ data }) => {
                console.log("data", data);
                if (data.error) {
                    this.setState({
                        error: true,
                    });
                } else {
                    location.replace("/");
                }
            })
            .catch((error) => {
                console.log("error on /login: ", error);
            });
    }

    render() {
        return (
            <div className="Login">
                <Form>
                    <Col lg={12} className="Login-Col">
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                autoFocus
                                name="email"
                                placeholder="Email"
                                type="text"
                                onChange={(e) => this.handleChange(e)}
                                block
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name="password"
                                placeholder="Password"
                                type="password"
                                onChange={(e) => this.handleChange(e)}
                                block
                            />
                        </Form.Group>
                        <Button
                            size="lg"
                            block
                            onClick={(e) => this.handleClick(e)}
                        >
                            Login
                        </Button>
                        <p>
                            Don&rsquo;t have an account yet?{" "}
                            <Link to="/register">Click here to Register.</Link>
                            <br />
                            Forgotten your password?{" "}
                            <Link to="/reset-password">
                                Click here to Reset.
                            </Link>
                        </p>
                    </Col>
                </Form>
            </div>
        );
    }
}
