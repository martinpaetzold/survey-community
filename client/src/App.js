import { Component } from "react";
import axios from "./axios";
import ProfilePic from "./ProfilePicture.js";
import Uploader from "./Uploader.js";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
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

    render() {
        return (
            <div>
                <h1>Hello, {this.state.first}!</h1>
                <h2>Nice to see you again.</h2>
                <ProfilePic
                    first={this.state.first}
                    last={this.state.last}
                    profilePic={this.state.profilePic}
                    toggleUploader={() => this.toggleUploader()}
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
