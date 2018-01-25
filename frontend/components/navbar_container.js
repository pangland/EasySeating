import React from 'react';
import { connect } from 'react-redux';
import SessionForm from './session/session_form';
import Navbar from './navbar';
import { login, logout, signup, removeErrors,
  receiveCurrentUser } from '../actions/session_actions';
import { requestAllReservations } from '../actions/reservation_actions';
import { requestAllFavorites } from '../actions/favorite_actions';

const mapStateToProps = ( state ) => {
  return {
    loggedIn: (typeof state.session.username !== 'undefined'),
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
    requestAllReservations: () => dispatch(requestAllReservations()),
    requestAllFavorites: () => dispatch(requestAllFavorites())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
