import React, {Component} from 'react';
import {getProject, createProject} from "../../redux_actions/projectActions";
import PropTypes from "prop-types"
import {connect} from "react-redux"
import classnames from "classnames"

class UpdateProject extends Component {

    state = {
        id:"",
        projectName: "",
        projectIdentifier: "",
        description: "",
        start_date: "",
        end_date: "",
        errors: {}
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const updatedProject = {
            id: this.state.id,
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        }
        // console.log(newProject)
        this.props.createProject(updatedProject, this.props.history)

    }


    componentDidMount() {
        const id = this.props.match.params.id
        console.log(this.props)
        this.props.getProject(id, this.props.history)

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState({
            id:nextProps.project.id,
            projectName: nextProps.project.projectName,
            projectIdentifier: nextProps.project.projectIdentifier,
            description: nextProps.project.description,
            start_date: nextProps.project.start_date,
            end_date: nextProps.project.end_date
        })
    }

    render() {
        const {errors} = this.state
        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Update Project form</h5>
                            <hr/>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.projectName
                                        })}
                                        placeholder="Project Name"
                                        name="projectName"
                                        defaultValue={this.state.projectName}
                                        onChange={this.onChange}
                                    />
                                    {errors.projectName && (
                                        <div className="invalid-feedback">{errors.projectName}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {"is-invalid": errors.projectIdentifier})}
                                        placeholder="Unique Project ID"
                                        name="projectIdentifier"
                                        defaultValue={this.state.projectIdentifier}
                                        onChange={this.onChange}
                                    />
                                    {errors.projectIdentifier && (
                                        <div className="invalid-feedback">{errors.projectIdentifier}</div>
                                    )}
                                </div>
                                <div className="form-group">
                  <textarea
                      className={classnames("form-control form-control-lg", {"is-invalid": errors.description})}
                      placeholder="Project Description"
                      name="description"
                      defaultValue={this.state.description}
                      onChange={this.onChange}
                  />
                                    {errors.description && (
                                        <div className="invalid-feedback">{errors.description}</div>
                                    )}
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        name="start_date"
                                        defaultValue={this.state.start_date}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        name="end_date"
                                        defaultValue={this.state.end_date}
                                        onChange={this.onChange}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    className="btn btn-primary btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UpdateProject.propTypes = {
    getProject: PropTypes.func.isRequired,
    createProject:PropTypes.func.isRequired,
    project: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    project: state.project.project
})

export default connect(mapStateToProps, {getProject, createProject})(UpdateProject);