import React, {Component} from 'react';
import ProjectItem from "./project/ProjectItem";
import CreateProjectButton from "./project/CreateProjectButton";
import {connect} from "react-redux";
import {getProjects} from "../redux_actions/projectActions"
import PropTypes from "prop-types"

class Dashboard extends Component {

    componentDidMount(){
        this.props.getProjects()
    }

    render() {

        return (
            <div className="projects">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Projects</h1>
                            <CreateProjectButton/>
                            <br/>
                            <hr/>
                            <ProjectItem/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getProjects: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    project: state.project
})

export default connect(mapStateToProps, {getProjects})(Dashboard);