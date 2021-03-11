import { Component } from "react";
import axios from "./axios.js";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            draftBio: "",
            textareaVisible: false,
            error: false,
        };
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state in handleChange")
        );
    }

    toggleTextarea() {
        this.setState({
            textareaVisible: !this.state.textareaVisible,
        });
    }

    submitBio(e) {
        e.preventDefault();
        console.log("handleUploadBio");
        axios
            .post("/user/profile/shortbio", this.state)
            .then(({ data }) => {
                console.log("data", data);
                this.setState({ textareaVisible: false });
                // if (data.sucess) {
                this.props.setBio(data.bio);
                // } else {
                //     this.setState({
                //         error: true,
                //     });
                // }
            })
            .catch((error) => {
                console.log("error ", error);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        return (
            <div className="profile-bio">
                {this.state.error && (
                    <p className="errorMessage">
                        Something went wrong. Please try again
                    </p>
                )}

                {this.state.textareaVisible && (
                    <textarea
                        name="draftBio"
                        onChange={(e) => this.handleChange(e)}
                        defaultValue={this.props.bio}
                    />
                )}
                {!this.props.bio && !this.state.textareaVisible && (
                    <p onClick={() => this.toggleTextarea()}>
                        Add your bio now
                    </p>
                )}

                {this.props.bio && !this.state.textareaVisible && (
                    <p>{this.props.bio}</p>
                )}

                {this.props.bio && !this.state.textareaVisible && (
                    <button onClick={() => this.toggleTextarea()}>
                        Edit bio
                    </button>
                )}

                {this.state.textareaVisible && (
                    <button onClick={(e) => this.submitBio(e)}>Save</button>
                )}

                {this.state.textareaVisible && (
                    <button onClick={() => this.toggleTextarea()}>
                        Cancel
                    </button>
                )}
            </div>
        );
    }
}
