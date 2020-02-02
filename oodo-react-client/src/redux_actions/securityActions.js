import axios from "axios";
import {GET_ERRORS} from "./types";

export const createNewUser = (newUser, history) => async dispach => {
    try {
        await axios.post("/api/users/register", newUser)
        history.push("/login")
        dispach({
            type: GET_ERRORS,
            payload: {}
        })
    } catch (error) {
        dispach({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }

}
