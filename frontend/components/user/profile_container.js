import React from 'react';
import { connect } from 'react-redux';
import Profile from './profile';

const mapStateToProps = ( state ) => {
  debugger
  return {
    currentUser: state.session,
    past_reservations: state.user.past_reservations,
    upcoming_reservations: state.user.upcoming_reservations
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//
//   };
// };

export default connect(mapStateToProps, null)(Profile);
