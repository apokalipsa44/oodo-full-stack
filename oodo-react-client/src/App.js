import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layout/Header";
import Dashboard from "./components/Dashboard";
import {BrowserRouter as Router, Route} from "react-router-dom";
import AddProject from "./components/project/AddProject";
import {Provider} from "react-redux";
import store from "./store"
import UpdateProject from "./components/project/UpdateProject";
import ProjectBoard from "./components/projectBoard/ProjectBoard";
import AddProjectTaskForm from "./components/projectBoard/projectTask/AddProjectTaskForm";
import Landing from "./components/layout/Landing";
import Login from "./components/userManagment/Login";
import Register from "./components/userManagment/Register";

function App() {
    return (
        <Provider store={store}>
        <Router>
            <div className="App">
                <Header/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/addProject" component={AddProject}/>
                <Route path="/updateProject/:id" component={UpdateProject}/>
                <Route path="/projectBoard/:id" component={ProjectBoard}/>
                <Route path="/addProjectTask/:id" component={AddProjectTaskForm}/>
                <Route path="/landing" component={Landing}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </div>
        </Router>
        </Provider>
    );
}

export default App;
