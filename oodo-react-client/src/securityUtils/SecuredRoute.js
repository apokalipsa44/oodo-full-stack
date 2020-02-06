import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types"
import {Route, Redirect} from "react-router-dom"


const SecuredRoute=({component:Component, security, ...otherProps})=>(
    <Route {...otherProps} render={props =>
        security.validToken===true?
            (<Component{...props}/>):(<Redirect to="/login"/>)}/>
)
SecuredRoute.propTypes={
    security:PropTypes.object.isRequired
}

const mapStateToProps=props=>({
    security:props.security
})

export default connect(mapStateToProps)(SecuredRoute)

