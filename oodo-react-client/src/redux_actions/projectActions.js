import axios from "axios";
import {GET_ERRORS, GET_PROJECTS, GET_PROJECT} from "./types";


export const createProject = (project, history) => async dispach => {
    try {
        const resp = await axios.post("http://localhost:8080/api/project", project)
        history.push("/dashboard")
        // console.log(history)
    } catch (error) {
        // console.log(error.response.data)
        dispach({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

export const getProjects = () => async dispach => {
    const resp = await axios.get("http://localhost:8080/api/project/all")
    dispach({
        type: GET_PROJECTS,
        payload: resp.data
    })
}
export const getProject = (id, history) => async dispach => {
    const resp = await axios.get(`http://localhost:8080/api/project/${id}`)
    dispach({
        type: GET_PROJECT,
        payload: resp.data
    })
}
