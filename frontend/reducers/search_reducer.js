import { RECEIVE_ALL_RESTAURANTS, RECEIVE_SINGLE_RESTAURANT,
  RECEIVE_RESTAURANT_ERRORS, REMOVE_RESTAURANT_ERRORS,
  RECEIVE_RESTAURANT_SEARCH,
  RECEIVE_RESTAURANT_FILTER } from '../actions/restaurant_actions';

import { filterRestaurants } from './selectors';

import merge from 'lodash/merge';

const defaultState = {
  restaurants: []
};

const searchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_RESTAURANT_SEARCH:
      return merge({}, state, action.restaurants);
    case RECEIVE_RESTAURANT_FILTER:
      const restaurants = filterRestaurants(state.restaurants, action.restaurants);
      return Object.assign({}, state, {restaurants});
    default:
      return state;
  }
};

export default searchReducer;
