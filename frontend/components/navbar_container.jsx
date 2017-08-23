import React from 'react';
import { connect } from 'react-redux';
import SessionForm from './session_form';
import Navbar from './navbar';
import { login, logout, signup, removeErrors } from '../actions/session_actions';

const mapStateToProps = ({ session }) => {
  return {
    loggedIn: session.currentUser != null,
    errors: session.errors,
    createForm: false
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    login: (user) => dispatch(login(user)),
    signup: (user) => dispatch(signup(user)),
    removeErrors: () => dispatch(removeErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
