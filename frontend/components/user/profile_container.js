import React from 'react';
import { connect } from 'react-redux';
import Profile from './profile';
import { removeReviewErrors,
  createReview } from '../../actions/review_actions';
import { selectUserReservations } from '../../reducers/selectors';

const mapStateToProps = ( state ) => {
  debugger
  return {
    currentUser: state.session,
    reservations: selectUserReservations(state),
    errors: state.errors.review
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeErrors: () => dispatch(removeReviewErrors()),
    createReview: (review) => dispatch(createReview(review)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
