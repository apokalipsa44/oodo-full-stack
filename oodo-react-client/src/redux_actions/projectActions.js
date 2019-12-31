import axios from "axios";
import {GET_ERRORS} from "./types";


export const createProject = (project, history) => async dispach => {
    try {
        const resp = await axios.post("http://localhost:8080/api/project", project)
        history.push("/dashboard")
        console.log(history)
    } catch (error) {
        dispach({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}