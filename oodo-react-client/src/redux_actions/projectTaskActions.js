import axios from "axios";
import {GET_PROJECT_TASK, GET_BACKLOG, DELETE_PROJECT_TASK, GET_ERRORS} from "./types";

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