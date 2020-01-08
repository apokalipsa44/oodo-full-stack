import axios from "axios";
import {GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT} from "./types";


export const createProject = (project, history) => async dispach => {
    // console.log(project)
    try {
        const resp = await axios.post("/api/project", project)
        history.push("/dashboard")
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

export const getProjects = () => async dispach => {
    const resp = await axios.get("/api/project/all")
    dispach({
        type: GET_PROJECTS,
        payload: resp.data
    })
}
export const getProject = (id, history) => async dispach => {

    try {
        const resp = await axios.get(`/api/project/${id}`)
        dispach({
            type: GET_PROJECT,
            payload: resp.data
        })
    } catch (e) {
        history.push("/dashboard")
        console.log(e.response.data)
    }
}

export const deleteProject = (id) => async dispach => {
    if (window.confirm("Are You sure?")) {
        const resp = await axios.delete(`/api/project/${id}`)
        dispach({
            type: DELETE_PROJECT,
            payload: id
        })
    }
}
