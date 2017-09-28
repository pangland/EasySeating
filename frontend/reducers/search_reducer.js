import { RECEIVE_RESTAURANT_SEARCH, RECEIVE_RESTAURANT_FILTER,
  REMOVE_SEARCHED_RESTAURANTS,
  SET_SELECTED } from '../actions/restaurant_actions';

import { RECEIVE_RESERVATION_SEARCH,
  REMOVE_RESERVATIONS } from '../actions/reservation_actions';

import { filterRestaurants } from './selectors';

import merge from 'lodash/merge';

const defaultState = {
  restaurants: [],
  reservations: [],
  cuisines: [],
  selected: -1
};

const searchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_RESTAURANT_SEARCH:
      return merge({}, {restaurants: action.restaurants}, {cuisines: action.cuisines});
    case RECEIVE_RESERVATION_SEARCH:
      // return merge({}, state, {action.reservations);
      return merge({}, state, {reservations: action.reservations});
    case REMOVE_SEARCHED_RESTAURANTS:
      return Object.assign({}, state, { restaurants: []}, { cuisines: []});
    case REMOVE_RESERVATIONS:
      return Object.assign({}), state, { reservations: []};
    case SET_SELECTED:
      return Object.assign({}, state, { selected: action.id});
    default:
      return state;
  }
};

export default searchReducer;
