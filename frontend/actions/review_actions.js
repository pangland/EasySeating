import * as APIUtil from '../util/review_api_util';

export const RECEIVE_ALL_REVIEWS = 'RECEIVE_ALL_REVIEWS';
export const RECEIVE_SINGLE_REVIEW = 'RECEIVE_SINGLE_REVIEW';

export const receiveAllReviews = (reviews) => {
  return {
    type: RECEIVE_ALL_REVIEWS,
    reviews
  };
};

export const receiveSingleReview = (review) => {
  return {
    type: RECEIVE_SINGLE_REVIEW,
    review
  };
};

export const requestAllReviews = (data) => (dispatch) => {
  return APIUtil.fetchAllReviews(data)
    .then(reviews => dispatch(receiveAllReviews(reviews)));
};

export const requestSingleReview = (id) => (dispatch) => {
  return APIUtil.fetchSingleReview(id)
    .then(review => dispatch(receiveSingleReview(review)));
};

export const createReview = review => dispatch => {
  return APIUtil.createReview(review).then(review =>
    dispatch(receiveSingleReview(review)));
};
