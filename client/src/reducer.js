import {
    LOAD_FRIENDS,
    ACCEPT_FRIEND,
    UNFRIEND,
    ACTION_CHAT_MESSAGE,
    CHAT_MESSAGES,
} from "./actions.js";

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

    if (action.type == ACTION_CHAT_MESSAGE) {
        state = {
            ...state,
            messages: [...state.messages, ...action.messages],
        };
    }

    if (action.type == CHAT_MESSAGES) {
        state = {
            ...state,
            messages: action.messages,
        };
    }

    return state;
}
