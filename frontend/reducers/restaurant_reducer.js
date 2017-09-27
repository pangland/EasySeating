import { RECEIVE_ALL_RESTAURANTS, RECEIVE_SINGLE_RESTAURANT,
  RECEIVE_RESTAURANT_ERRORS, REMOVE_RESTAURANT_ERRORS,
  RECEIVE_RESTAURANT_SEARCH,
  REMOVE_RESTAURANTS } from '../actions/restaurant_actions';

import merge from 'lodash/merge';

const restaurantReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_SINGLE_RESTAURANT:
      const res = action.restaurant;
      // return merge({}, state, { restaurant: res });
      return merge({}, state, {[action.restaurant.id]: action.restaurant});
    case RECEIVE_ALL_RESTAURANTS:
      
      return merge({}, state, action.data.restaurants);
      // return action.restaurants;
    case REMOVE_RESTAURANTS:
      
      return {};
    // case RECEIVE_RESTAURANT_SEARCH:
    //   return merge({}, state, action.restaurants);
    default:
      return state;
  }
};

export default restaurantReducer;
