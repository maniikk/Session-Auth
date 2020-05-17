import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
export default () => (
    <Fragment>
        <h1>Welcome!</h1>
        <Link to='/login'>Login</Link>
        <Link to ='/signup'>Signup</Link>
        <Link to = '/dashboard'>Dashboard</Link>
    </Fragment>
);