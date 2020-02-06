import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layout/Header";
import Dashboard from "./components/Dashboard";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AddProject from "./components/project/AddProject";
import {Provider} from "react-redux";
import store from "./store"
import UpdateProject from "./components/project/UpdateProject";
import ProjectBoard from "./components/projectBoard/ProjectBoard";
import AddProjectTaskForm from "./components/projectBoard/projectTask/AddProjectTaskForm";
import Landing from "./components/layout/Landing";
import Login from "./components/userManagment/Login";
import Register from "./components/userManagment/Register";
import setJwtToken from "./securityUtils/JwtTokenUtils"
import jwtDecode from "jwt-decode"
import {SET_CURRENT_USER} from "./redux_actions/types";
import {logout} from "./redux_actions/securityActions";
import SecuredRoute from "./securityUtils/SecuredRoute";
import UpdateProjectTask from "./components/projectBoard/projectTask/UpdateProjectTask";


const token = localStorage.jwtToken

if (token) {
    setJwtToken(token)
    const decodedToken = jwtDecode(token)
    store.dispatch({
        type: SET_CURRENT_USER,
        payload: decodedToken
    })

    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
        store.dispatch(logout())
        window.location.href = "/landing"
    }
}


function App() {


    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Header/>
                    <Switch>
                        <SecuredRoute path="/dashboard" component={Dashboard}/>
                        <SecuredRoute path="/addProject" component={AddProject}/>
                        <SecuredRoute path="/updateProject/:id" component={UpdateProject}/>
                        <SecuredRoute path="/projectBoard/:id" component={ProjectBoard}/>
                        <SecuredRoute path="/addProjectTask/:id" component={AddProjectTaskForm}/>
                        <SecuredRoute exact path="/updateProjectTask/:backlog_id/:pt_id" component={UpdateProjectTask}/>
                    </Switch>
                    <Route path="/landing" component={Landing}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
