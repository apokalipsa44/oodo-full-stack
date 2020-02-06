import axios from "axios";
import {GET_PROJECT_TASK, GET_BACKLOG, DELETE_PROJECT_TASK, GET_ERRORS, GET_PROJECT} from "./types";

export const addProjectTask = (backlog_id, project_task, history) => async dipatch => {

    try {
        await axios.post(`/api/backlog/${backlog_id}`, project_task)
        history.push(`/projectBoard/${backlog_id}`)     //wraca na projectoaerd konkretnego projektu jak cos jest nok
        dipatch({
            type: GET_ERRORS,
            payload: {}
        })
    } catch (e) {
        dipatch({
            type: GET_ERRORS,
            payload: e.response.data
        })
    }
}

export const getBacklog = (backlog_id, history) => async dispach => {

    try {
        const resp = await axios.get(`/api/backlog/${backlog_id}`)
        dispach({
            type: GET_BACKLOG,
            payload: resp.data
        })
    } catch (e) {
        history.push("/dashboard")
        console.log(e.response.data)
    }
}

export const deleteProjectTask = (backlog_id, pt_id) => async dispatch => {
    if (
        window.confirm(
            `You are deleting project task ${pt_id}, this action cannot be undone`
        )
    ) {
        await axios.delete(`/api/backlog/${backlog_id}/${pt_id}`);
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: pt_id
        });
    }
};

export const getProjectTask = (backlog_id, pt_id, history) => async dispatch => {
    try {
        const res = await axios.get(`/api/backlog/${backlog_id}/${pt_id}`);
        dispatch({
            type: GET_PROJECT_TASK,
            payload: res.data
        });
    } catch (err) {
        history.push("/dashboard");
    }
};

export const updateProjectTask = (backlog_id, pt_id, project_task, history) => async dispatch => {
    try {
        await axios.patch(`/api/backlog/${backlog_id}/${pt_id}`, project_task);
        history.push(`/projectBoard/${backlog_id}`);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};