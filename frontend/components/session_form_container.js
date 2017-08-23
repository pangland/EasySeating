import React from 'react';
import { connect } from 'react-redux';
import SessionForm from './session_form';
import zzSessionForm from './zzsession_form';
import { login, logout, signup } from '../actions/session_actions';

const mapStateToProps = ({ session }) => {
  return {
    loggedIn: session.currentUser != null,
    errors: session.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    login: (user) => dispatch(login(user)),
    signup: (user) => dispatch(signup(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(zzSessionForm);
