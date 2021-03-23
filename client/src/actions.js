import axios from "./axios.js";

export const LOAD_FRIENDS = "load friends";
export const ACCEPT_FRIEND = "accept friend";
export const UNFRIEND = "unfriend friend";

export const loadFriends = async () => {
    const result = await axios.get("/api/wannabes");
    const friendsAndWannabesList = result.data;
    return {
        type: LOAD_FRIENDS,
        friends: friendsAndWannabesList,
    };
};

export const acceptFriend = async (otherID) => {
    const result = await axios.post("/api/requests/friends/accept/" + otherID);
    const statusFriendRequest = result.data;
    console.log(statusFriendRequest);
    return {
        type: ACCEPT_FRIEND,
        friends: statusFriendRequest,
    };
};

export const unFriend = async (otherID) => {
    const result = await axios.post(
        "/api/requests/friends/unfriend/" + otherID
    );
    const statusFriendRequest = result.data;
    console.log(statusFriendRequest);
    return {
        type: UNFRIEND,
        friends: statusFriendRequest,
    };
};
