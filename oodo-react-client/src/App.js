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
            </div>
        </Router>
        </Provider>
    );
}

export default App;
