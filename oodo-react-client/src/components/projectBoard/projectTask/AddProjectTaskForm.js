import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types"
import {connect} from "react-redux"
import classnames from "classnames";
import {addProjectTask} from "../../../redux_actions/projectTaskActions";

class AddProjectTaskForm extends Component {


    id = this.props.match.params

    state = {
        projectSummary: "",
        acceptanceCriteria: "",
        priority: 0,
        status: "",
        // dueDate: "",    todo uporć się z localDate
        projectIdentifier: this.id.id,
        errors: {}
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.errors) {
            console.log(nextProps.errors)
            this.setState({errors: nextProps.errors});
        }
    }


    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()

        const newProjectTask = {
            projectSummary: this.state.projectSummary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            priority: this.state.priority,
            status: this.state.status,
            // dueDate: this.state.dueDate,
        }
        // console.log(newProjectTask)
        this.props.addProjectTask(this.state.projectIdentifier, newProjectTask, this.props.history)
    }


    render() {

        const {id} = this.props.match.params;
        const {errors} = this.state
        return (
            <div className="add-PBI">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to={`/projectBoard/${id}`} className="btn btn-light">
                                Back to Project Board
                            </Link>
                            <h4 className="display-4 text-center">Add Project Task</h4>
                            <p className="lead text-center">Project Name + Project Code</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        // className={classnames("form-control form-control-lg", {"is-invalid":errors.projectIdentifier})}
                                        className={classnames("form-control form-control-lg", {"is-invalid": errors.projectSummary})}
                                        name="projectSummary"
                                        placeholder="Project Task summary"
                                        value={this.state.projectSummary}
                                        onChange={this.onChange}
                                    />
                                    {/*error msg*/}
                                    {errors.projectSummary && (
                                        <div className="invalid-feedback">{errors.projectSummary}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                            <textarea
                                                className="form-control form-control-lg"
                                                placeholder="Acceptance Criteria"
                                                name="acceptanceCriteria"
                                                value={this.state.acceptanceCriteria}
                                                onChange={this.onChange}
                                            />
                                </div>
                                <h6>Due Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        name="dueDate"
                                        // value={this.state.dueDate}
                                        // onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <select
                                        className="form-control form-control-lg"
                                        name="priority"
                                        value={this.state.priority}
                                        onChange={this.onChange}
                                    >
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <select
                                        className="form-control form-control-lg"
                                        name="status"
                                        value={this.state.status}
                                        onChange={this.onChange}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
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

AddProjectTaskForm.propTypes = {
    addProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, {addProjectTask})(AddProjectTaskForm);

