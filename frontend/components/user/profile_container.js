import React from 'react';
import { connect } from 'react-redux';
import Profile from './profile';
import { selectUserReservations } from '../reducers/selectors';

const mapStateToProps = ( state ) => {
  debugger
  return {
    currentUser: state.session,
    reservations: selectUserReservations(state.session.reservations),
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//
//   };
// };

export default connect(mapStateToProps, null)(Profile);
