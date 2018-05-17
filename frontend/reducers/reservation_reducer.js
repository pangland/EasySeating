import { RECEIVE_SINGLE_RESERVATION } from '../actions/reservation_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_ALL_RESTAURANTS } from '../actions/restaurant_actions';
import { RECEIVE_SINGLE_REVIEW } from '../actions/review_actions';
import {
  RECEIVE_SINGLE_FAVORITE,
  REMOVE_SINGLE_FAVORITE
} from '../actions/favorite_actions';

import merge from 'lodash/merge';

const reservationReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      const obj3 = action.reservations.reduce((acc, cur, i) => {
        acc[Object.keys(cur)[0]] = Object.values(cur)[0];
        return acc;
      }, {});
      return merge({}, state, obj3);
    case RECEIVE_SINGLE_RESERVATION:
      return merge({}, state, {[action.reservation.id]: action.reservation});
    case RECEIVE_ALL_RESTAURANTS:
      const obj = action.data.reservations.reduce((acc, cur, i) => {
        acc[Object.keys(cur)[0]] = Object.values(cur)[0];
        return acc;
      }, {});
      return merge({}, state, obj);
    case RECEIVE_SINGLE_REVIEW:
      let obj2;
      if (Array.isArray(state)) {
        obj2 = state.reduce((acc, cur, i) => {
          acc[state[i].id] = state[i];
          return acc;
        }, {});
      } else {
        obj2 = merge({}, state);
      }
      // const obj2 = merge({}, state);
      obj2[action.review.reservation_id].reviewed = true;
      return obj2;
    case RECEIVE_SINGLE_FAVORITE:
      let newState;

      if (Array.isArray(state)) {
        newState = state.reduce((acc, cur, i) => {
          acc[state[i].id] = state[i];
          return acc;
        }, {});
      } else {
        newState = merge({}, state);
      }

      Object.keys(newState).forEach((key) => {

        if (newState[key].restaurant_id === action.favorite.restaurant_id) {
          newState[key].favorited = true;
        }
      });
      return newState;
    case REMOVE_SINGLE_FAVORITE:
      let newFavState = Object.assign({}, state);
      for (let key in state) {
        if (state[key].restaurant_id === action.favorite.restaurantId) {
          newFavState[key].favorited = false;
        }
      }
      return newFavState;
    default:
      return state;
  }
};

export default reservationReducer;
