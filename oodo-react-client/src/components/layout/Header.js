import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../redux_actions/securityActions";

class Header extends Component {
    logout = () => {
        this.props.logout()
        window.location.href = "/login"
    }

    render() {
        const {user, validToken} = this.props.security;
        let links;



        const userIsLogged = (
            <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">
                            Dashboard
                        </Link>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">
                            <i className="fas fa-user-circle mr-1"/>
                            {user.username}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            to="/logout"
                            onClick={this.logout}
                        >
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        )

        const userIsNotLogged = (
            <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">
                            Sign Up
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        )

        if (user && validToken) {
            links = userIsLogged
        } else {
            links = userIsNotLogged
        }

        return (

            <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/landing">
                        Personal Project Management Tool
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#mobile-nav"
                    >
                        <span className="navbar-toggler-icon"/>
                    </button>
                    {links}
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = props => ({
    security: props.security
});

export default connect(mapStateToProps, {logout})(Header);