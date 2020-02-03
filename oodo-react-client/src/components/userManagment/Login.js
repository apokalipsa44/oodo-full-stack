import React, {Component} from 'react';
import {connect} from "react-redux";
import classnames from "classnames"
import PropTypes from "prop-types"
import {loginRequest} from "./../../redux_actions/securityActions"

class Login extends Component {
    state = {
        username: "",
        password: "",
        errors: {}
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.errors) {
            // console.log(nextProps)
            this.setState({errors: nextProps.errors});
        }
        if(nextProps.security.validToken){
            this.props.history.push("/dashboard")
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()

        const login = {
            username: this.state.username,
            password: this.state.password
        }
        console.log(login)
        this.props.loginRequest(login)
    }


    render() {
        const {errors} = this.state
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.username
                                        })}
                                        placeholder="Email Address"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChange}
                                    />
                                    {errors.username && (
                                        <div className="invalid-feedback">{errors.username}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.password
                                        })}
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginRequest: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
})

export default connect(mapStateToProps, {loginRequest})(Login);