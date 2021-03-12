import ProfileBio from "./ProfileBio.js";
import ProfilePicture from "./ProfilePicture.js";

export default function Profile(props) {
    console.log("props/profile component:", props);
    return (
        <div>
            <h2>
                User: {props.first} {props.last}
            </h2>
            <ProfilePicture
                toggleUploader={props.toggleUploader}
                profilePic={props.profilePic}
            />
            <ProfileBio setBio={props.setBio} bio={props.bio} />
        </div>
    );
}