import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "./axios.js";
import ProfilePicture from "./ProfilePicture.js";
import Uploader from "./Uploader.js";
import Profile from "./Profile.js";
import OtherProfile from "./OtherProfile.js";
import ProfileSearch from "./ProfileSearch.js";
import Friends from "./Friends.js";
import Chat from "./Chat.js";
import Messages from "./Messages.js";
import MySurvey from "./components/surveyDisplays/survey_one.js";
import MySurvey2 from "./components/surveyDisplays/survey_two.js";
import Dashboard from "./Dashboard.js";
import SurveysOverview from "./components/SurveysOverview.js";
import Navbar from "./components/Navbar.js";

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
        axios
            .get("/user/profile")
            .then(({ data }) => {
                this.setState({
                    id: data.id,
                    first: data.firstname,
                    last: data.lastname,
                    email: data.email,
                    bio: data.short_bio,
                    profilePic: data.profile_picture_url,
                });
            })
            .catch((error) => {
                console.log("error", error);
                this.props.history.push("/");
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
            <BrowserRouter>
                <>
                    <Navbar
                        first={this.state.first}
                        profilePic={this.state.profilePic}
                    />

                    <div className="main-container">
                        <Route
                            exact
                            path="/user/:id"
                            render={(props) => (
                                <OtherProfile
                                    match={props.match}
                                    key={props.match.url}
                                    history={props.history}
                                />
                            )}
                        />

                        <Route
                            path="/users"
                            render={(props) => (
                                <ProfileSearch
                                    match={props.match}
                                    key={props.match.url}
                                    history={props.history}
                                />
                            )}
                        />

                        <Route path={"/"} exact component={Dashboard} />

                        <Route
                            exact
                            path="/profile"
                            render={() => (
                                <Profile
                                    id={this.state.id}
                                    first={this.state.first}
                                    last={this.state.last}
                                    profilePic={this.state.profilePic}
                                    toggleUploader={() => this.toggleUploader()}
                                    bio={this.state.bio}
                                    setBio={(e) => this.setBio(e)}
                                />
                            )}
                        />

                        <Route
                            path="/friends"
                            render={(props) => (
                                <Friends
                                    match={props.match}
                                    key={props.match.url}
                                    history={props.history}
                                />
                            )}
                        />

                        <Route path={"/chat"} exact component={Chat} />

                        <Route
                            path={"/surveys"}
                            exact
                            component={SurveysOverview}
                        />

                        <Route path={"/surveys/1"} exact component={MySurvey} />

                        <Route
                            path={"/surveys/2"}
                            exact
                            component={MySurvey2}
                        />

                        <Route
                            path="/messages/:id"
                            render={(props) => (
                                <Messages
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                    </div>

                    {this.state.uploaderIsVisible && (
                        <Uploader
                            image={this.state.image}
                            setImage={(e) => this.setImage(e)}
                            toggleUploader={() => this.toggleUploader()}
                        />
                    )}
                </>
            </BrowserRouter>
        );
    }
}
