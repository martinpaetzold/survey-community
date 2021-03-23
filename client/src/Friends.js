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
                            <Link to={"/user/" + friend.id}>
                                <img src={friend.profile_pic_url} />
                                {friend.firstname}
                                {friend.lastname}
                            </Link>
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
