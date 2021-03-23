import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { acceptFriend, unFriend, loadFriends } from "./actions.js";

export default function FriendsAndWantFriends(props) {
    const dispatch = useDispatch();

    const wantFriends = useSelector((state) =>
        state.friends ? state.friends.filter((friend) => !friend.accepted) : []
    );

    const friends = useSelector(function (state) {
        if (state.friends) {
            return state.friends.filter((friend) => friend.accepted);
        } else {
            return [];
        }
    });

    useEffect(() => {
        dispatch(loadFriends());
    }, []);

    return (
        <div className="friends-overview">
            <h2>Friend requests</h2>
            {!wantFriends && <div>You have no current requests</div>}
            {wantFriends &&
                wantFriends.map((wantFriend) => {
                    return (
                        <div key={wantFriend.id} className="wantFriend">
                            <Link to={"/user/" + wantFriend.id}></Link>
                            <img src={wantFriend.profile_pic_url} />
                            {wantFriend.firstname} {wantFriend.lastname}
                            <button
                                onClick={(e) =>
                                    dispatch(acceptFriend(wantFriend.id))
                                }
                            >
                                Accept Friend
                            </button>
                        </div>
                    );
                })}

            <h2>Friend List</h2>
            {!friends && <div>You have no friends</div>}
            {friends &&
                friends.map((friend) => {
                    return (
                        <div key={friend.firstname} className="friend">
                            <Link to={"/user/" + friend.id}></Link>
                            <img src={friend.profile_pic_url} />
                            {friend.firstname}
                            {friend.lastname}
                            <button
                                onClick={(e) => dispatch(unFriend(friend.id))}
                            >
                                Unfriend
                            </button>
                        </div>
                    );
                })}
        </div>
    );
}
/*import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { acceptFriend, unfriend, loadFriends } from "./actions.js";
import { Link } from "react-router-dom";
import { UNFRIEND, ACCEPT_FRIEND } from "./actions.js";

const FriendsAndWannabes = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadFriends());
    }, []);
    const friendsAndWannabes = useSelector((state) => state.friendsAndWannabes);
    console.log("friends...", friendsAndWannabes);

    const statusButton = (status, otherID) => {
        return (
            <button
                onClick={async () => {
                    if (status) {
                        await dispatch(unfriend(otherID));
                    } else {
                        await dispatch(acceptFriend(otherID));
                    }
                }}
            >
                {status ? UNFRIEND : ACCEPT_FRIEND}
            </button>
        );
    };

    const generatePeopleDiv = (friend) => {
        return (
            <div className="friendOrWannabe" key={friend.id}>
                <div className="requestsProfileBox">
                    <p>{friend.firstname + " " + friend.lastname}</p>
                    <Link to={"/user/" + friend.id}>
                        to {friend.firstname}`s profile
                    </Link>
                </div>
                {statusButton(friend.accepted, friend.id)}
            </div>
        );
    };

    return (
        <div className="FriendsAndWannabes">
            <h1>Friends</h1>
            {friendsAndWannabes &&
                friendsAndWannabes
                    .filter((friend) => friend.accepted === true)
                    .map((friend) => generatePeopleDiv(friend))}
            <h1>Requests</h1>
            {friendsAndWannabes &&
                friendsAndWannabes
                    .filter((friend) => friend.accepted === false)
                    .map((friend) => generatePeopleDiv(friend))}
        </div>
    );
};

export default FriendsAndWannabes;
*/
