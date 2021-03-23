import { LOAD_FRIENDS, ACCEPT_FRIEND, UNFRIEND } from "./actions.js";

export default function (state = {}, action) {
    if (action.type == LOAD_FRIENDS) {
        state = {
            ...state,
            friends: action.friends,
        };
    }

    if (action.type == ACCEPT_FRIEND) {
        state = {
            ...state,
            friends: state.friends.map((friend) => {
                if (friend.id === action.id) {
                    friend.accepted = true;
                }
                return friend;
            }),
        };
    }

    if (action.type == UNFRIEND) {
        state = {
            ...state,
            friends: state.friends.filter((friend) => {
                if (friend.id === action.id) {
                    return false;
                } else {
                    return true;
                }
            }),
        };
    }

    return state;
}
