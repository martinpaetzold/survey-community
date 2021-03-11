import React from "react";

export default function ProfilePic({
    first,
    last,
    profilePic,
    toggleUploader,
}) {
    return (
        <div>
            {!profilePic && (
                <img
                    onClick={() => toggleUploader()}
                    className="profile-img"
                    src="../users_profile_default.png"
                    alt={`${first} ${last}`}
                />
            )}
            {profilePic && (
                <img
                    onClick={() => toggleUploader()}
                    className="profile-img"
                    src={profilePic}
                    alt={`${first} ${last}`}
                />
            )}
        </div>
    );
}
