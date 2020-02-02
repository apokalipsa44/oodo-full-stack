import {SET_CURRENT_USER} from "../redux_actions/types";

const initialState = {
    user: {},
    validToken: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                validToken: true,
                user: action.payload
            }
        default:
            return state
    }
}