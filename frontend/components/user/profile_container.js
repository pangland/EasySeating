import React from 'react';
import { connect } from 'react-redux';
import Profile from './profile';
import { removeReviewErrors, requestSingleReview,
  createReview, updateReview } from '../../actions/review_actions';
import { selectUserReservations,
  selectUserFavorites } from '../../reducers/selectors';
import { createFavorite } from '../../actions/favorite_actions';

const mapStateToProps = ( state ) => {
  return {
    currentUser: state.session,
    reservations: selectUserReservations(state),
    favorites: selectUserFavorites(state),
    errors: state.errors.review,
    reviews: state.session.reviews
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeErrors: () => dispatch(removeReviewErrors()),
    requestSingleReview: (review) => dispatch(requestSingleReview(review)),
    createReview: (review) => dispatch(createReview(review)),
    createFavorite: (favorite) => dispatch(createFavorite(favorite)),
    updateReview: (review) => dispatch(updateReview(review))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
