import axios from "axios";
import {GET_ERRORS, SET_CURRENT_USER} from "./types";
import setJwtToken from "../securityUtils/JwtTokenUtils"
import jwtDecode from "jwt-decode"

export const createNewUser = (newUser, history) => async dispatch => {
    try {
        await axios.post("/api/users/register", newUser)
        history.push("/login")
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }

}

export const loginRequest = login => async dispatch => {
    try {
        const response = await axios.post("/api/users/login", login)
        const {token} = response.data
        localStorage.setItem("jwtToken", token)  //puts the token to localStorage
        setJwtToken(token)  //sets token in a header
        const decodedToken = jwtDecode(token)  //decodes the token
        dispatch({
            type: SET_CURRENT_USER,
            payload: decodedToken
        })
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })

    }
}

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken")
    setJwtToken(false)
    dispatch({
        type:SET_CURRENT_USER,
        payload:{}
    })
}