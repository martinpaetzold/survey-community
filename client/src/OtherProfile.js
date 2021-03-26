import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "./axios.js";
import ButtonRequestFriend from "./ButtonRequestFriend.js";

export default class OtherProfile extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            firstname: "",
            lastname: "",
            email: "",
            bio: "",
            profilePic: "",
        };
    }

    componentDidMount() {
        axios
            .get("/api/user/" + this.props.match.params.id)
            .then(({ data }) => {
                console.log("res", data);
                if (this.props.match.params.id == data.loggedId) {
                    this.props.history.push("/");
                } else {
                    this.setState({
                        id: data.id,
                        first: data.firstname,
                        last: data.lastname,
                        email: data.email,
                        bio: data.short_bio,
                        profilePic: data.profile_picture_url,
                    });
                }
            });
    }

    render() {
        return (
            <div>
                <div className="other-profile">
                    {!this.state.profilePic && (
                        <img
                            className="profile-img"
                            src="../default-img.png"
                            alt={`${this.state.first} ${this.state.last}`}
                        />
                    )}
                    {this.state.profilePic && (
                        <img
                            className="profile-img"
                            src={this.state.profilePic}
                            alt={`${this.state.first} ${this.state.last}`}
                        />
                    )}
                </div>
                <h1>
                    My name is {this.state.first} {this.state.last}
                </h1>
                <p>Bio: {this.state.bio}</p>
                <ButtonRequestFriend userIdOther={this.state.id} />
            </div>
        );
    }
}
