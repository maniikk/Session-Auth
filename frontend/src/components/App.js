import React, { Fragment } from 'react';
import {Route} from 'react-router-dom';
import Signup from './Signup';
import Welcome from  './Welcome';
import Login from './Login';
import Dashboard from './Dashboard';
import {AuthRoute, ProtectedRoute} from '../util/route'
export default ()=> (
  <Fragment>
    <Route exact path = '/' component = {Welcome}></Route>
    <AuthRoute path = '/login' component = {Login}></AuthRoute>
    <AuthRoute path = '/signup' component = {Signup}></AuthRoute>
    <ProtectedRoute path = '/dashboard' component = {Dashboard}></ProtectedRoute>
  </Fragment>
)