import {
  RECEIVE_SINGLE_RESERVATION } from '../actions/reservation_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_ALL_RESTAURANTS} from '../actions/restaurant_actions';

import merge from 'lodash/merge';

const reservationReducer = (state = {}, action) => {
  Object.freeze(state)

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      // const existingReservations = action.currentUser.reservations.reduce((acc, entry) => {
      //   acc[entry.id] = entry;
      //   return acc;
      // }, {});
      //
      //
      // return existingReservations;
      return merge({}, state, action.currentUser.reservations);
    case RECEIVE_SINGLE_RESERVATION:
      return merge({}, state, {[action.reservation.id]: action.reservation});
    case RECEIVE_ALL_RESTAURANTS:
      const obj = action.data.reservations.reduce((acc, cur, i) => {
        acc[Object.keys(cur)[0]] = Object.values(cur)[0];
        return acc;
      }, {});
      return merge({}, state, obj);
    default:
      return state;
  }
};

export default reservationReducer;
