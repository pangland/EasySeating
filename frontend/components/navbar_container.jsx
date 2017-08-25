import React from 'react';
import { connect } from 'react-redux';
import SessionForm from './session_form';
import Navbar from './navbar';
import { login, logout, signup, removeErrors, receiveCurrentUser } from '../actions/session_actions';

const mapStateToProps = ( state ) => {
  debugger
  return {
    loggedIn: (typeof state.session.username != 'undefined'),
    currentUser: state.session,
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    login: (user) => dispatch(login(user)),
    signup: (user) => dispatch(signup(user)),
    removeErrors: () => dispatch(removeErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
