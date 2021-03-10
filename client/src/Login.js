import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "./axios.js";

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
            <div className="registerField">
                <h2>Login</h2>
                {this.state.error && (
                    <p className="errorMessage">
                        Something went wrong. Please try again.
                    </p>
                )}
                <div className="formField">
                    <label>
                        Email
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="email"
                            placeholder="Email"
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
                    <button onClick={(e) => this.handleClick(e)}>
                        Login now
                    </button>
                    <p>
                        Don't have an account yet?{" "}
                        <Link to="/">Click here to Register.</Link>
                    </p>
                    <p>
                        Forgotten your password?{" "}
                        <Link to="/reset-password">Click here to Reset.</Link>
                    </p>
                </div>
            </div>
        );
    }
}
