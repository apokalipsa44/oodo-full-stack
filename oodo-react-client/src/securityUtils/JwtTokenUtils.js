import axios from "axios"

const setJwtToken = (token) => {
    if (token) {  //if there is a token
        axios.defaults.headers.common["Authorization"] = token

    } else {
        delete axios.defaults.headers.common["Authorization"]// if there is no token -> delete the header Authorization
    }
}
export default setJwtToken;