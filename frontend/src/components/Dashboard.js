import React, { Fragment } from 'react'
import {connect} from 'react-redux'
import {logout} from "../actions/session";

const mapStateToProps = ({session}) => ({
    session
});

const mapDispatchToProps = dispatch => ({
    logout: user => dispatch(logout(user))
});

const Dashboard = ({logout, session}) => (
    <Fragment>
        <h1>Hi {session.username}</h1>
        <p>You are now logged in!</p>
        <button onClick = {logout}>Logout</button>
    </Fragment>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Dashboard);