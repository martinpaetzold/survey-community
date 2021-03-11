import { Component } from "react";
import axios from "./axios";
import ProfilePicture from "./ProfilePicture.js";
import Uploader from "./Uploader.js";
import Profile from "./Profile.js";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            first: "",
            last: "",
            email: "",
            bio: "",
            profilePic: null,
            uploaderIsVisible: false,
        };
    }

    componentDidMount() {
        axios.get("/user/profile").then(({ data }) => {
            this.setState({
                id: data.id,
                first: data.firstname,
                last: data.lastname,
                email: data.email,
                bio: data.short_bio,
                profilePic: data.profile_picture_url,
            });
        });
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    setImage(newProfilePic) {
        this.setState({
            profilePic: newProfilePic,
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    setBio(newBio) {
        this.setState({
            bio: newBio,
        });
    }

    render() {
        return (
            <div>
                <h1>Hello, {this.state.first}!</h1>
                <h2>Nice to see you again.</h2>
                <div className="profile-corner">
                    <ProfilePicture
                        first={this.state.first}
                        last={this.state.last}
                        profilePic={this.state.profilePic}
                        toggleUploader={() => this.toggleUploader()}
                    />
                </div>
                <Profile
                    id={this.state.id}
                    first={this.state.first}
                    last={this.state.last}
                    profilePic={this.state.profilePic}
                    toggleUploader={() => this.toggleUploader()}
                    bio={this.state.bio}
                    setBio={(e) => this.setBio(e)}
                />
                {this.state.uploaderIsVisible && (
                    <Uploader
                        setImage={(e) => this.setImage(e)}
                        closeHandler={(e) => {
                            this.setState({ uploaderIsVisible: false });
                        }}
                    />
                )}
            </div>
        );
    }
}
