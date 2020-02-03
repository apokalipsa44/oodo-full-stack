import {SET_CURRENT_USER} from "../redux_actions/types";

const initialState = {
    user: {},
    validToken: false
}

const isPayload = (payload) => {
    if (payload) {
        return true
    } else {
        return false
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                validToken: isPayload(action.payload),
                user: action.payload
            }
        default:
            return state
    }
}