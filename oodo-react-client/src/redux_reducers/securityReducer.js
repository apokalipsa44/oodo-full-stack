import {SET_CURRENT_USER} from "../redux_actions/types";

const initialState = {}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return action.payload
        default:
            return state
    }
}