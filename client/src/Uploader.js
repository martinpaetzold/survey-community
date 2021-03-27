import { Component } from "react";
import App from "./App";
import axios from "./axios.js";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
        };
    }

    handleChange(e) {
        this.setState(
            {
                image: e.target.files[0],
            },
            () => console.log("this.state in handleChange: ", e.target.files[0])
        );
    }

    handleUpload(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append("image", this.state.image);
        axios
            .post("/user/profile/upload", formData)
            .then(({ data }) => {
                console.log("data", data);
                if (data.sucess) {
                    this.props.setImage(data.url);
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((error) => {
                console.log("error ", error);
                this.setState({
                    error: true,
                });
            });
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.props.uploaderIsVisible,
        });
    }

    render() {
        //const { closeHandler } = this.props;
        //console.log("props > uploader", this.props);
        return (
            <div className="uploader_wrapper">
                <div className="uploader">
                    <div
                        className="close"
                        onClick={() => this.props.toggleUploader()}
                    >
                        close it!
                    </div>
                    <h1>Uploader</h1>
                    {this.state.error && (
                        <p className="errorMessage">
                            Something went wrong. Please try again
                        </p>
                    )}
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="image"
                        type="file"
                        accept="image/*"
                    />
                    <Button onClick={(e) => this.handleUpload(e)}>
                        Upload
                    </Button>
                </div>
            </div>
        );
    }
}
