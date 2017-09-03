import { RECEIVE_ALL_REVIEWS,
  RECEIVE_SINGLE_REVIEW} from '../actions/restaurant_actions';

import merge from 'lodash/merge';

const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_SINGLE_REVIEW:
      const rev = action.review;
      return merge({}, state, { review: rev });
    case RECEIVE_ALL_REVIEWS:
      return merge({}, state, action.restaurants);
    default:
      return state;
  }
};

export default reviewReducer;
