import {
  RECEIVE_SINGLE_RESERVATION } from '../actions/reservation_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_ALL_RESTAURANTS } from '../actions/restaurant_actions';
import { RECEIVE_SINGLE_REVIEW } from '../actions/review_actions';
import { RECEIVE_SINGLE_FAVORITE } from '../actions/favorite_actions';

import merge from 'lodash/merge';

const reservationReducer = (state = {}, action) => {
  Object.freeze(state)

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
      const obj2 = merge({}, state);
      obj2[action.review.reservation_id].reviewed = true;
      return obj2;
    case RECEIVE_SINGLE_FAVORITE:
      const obj4 = merge({}, state);

      Object.keys(obj4).forEach((key) => {
        if (obj4[key].reservation_id === action.favorite.reservation_id) {
          obj4[key].favorited = true;
        }
      });

      debugger

      obj4[action.favorite.reservation_id].favorited = true;
      return obj4;
    default:
      return state;
  }
};

export default reservationReducer;
