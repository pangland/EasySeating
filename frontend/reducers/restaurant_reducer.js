import { RECEIVE_ALL_RESTAURANTS, RECEIVE_SINGLE_RESTAURANT,
  RECEIVE_RESTAURANT_ERRORS, REMOVE_RESTAURANT_ERRORS,
  RECEIVE_RESTAURANT_SEARCH } from '../actions/restaurant_actions';

import merge from 'lodash/merge';

const restaurantReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_SINGLE_RESTAURANT:
      return merge({}, state, action.restaurant);
    case RECEIVE_ALL_RESTAURANTS:
      return merge({}, state, action.restaurants);
    // case RECEIVE_RESTAURANT_SEARCH:
    //   return merge({}, state, action.restaurants);
    default:
      return state;
  }
};

export default restaurantReducer;
