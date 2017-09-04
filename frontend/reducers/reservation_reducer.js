import {
  RECEIVE_SINGLE_RESERVATION } from '../actions/reservation_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

import merge from 'lodash/merge';

const reservationReducer = (state = {}, action) => {
  Object.freeze(state)

  switch (action.type) {
    // case RECEIVE_CURRENT_USER:
    //   return merge({}, state, action.currentUser.reservations);
    case RECEIVE_SINGLE_RESERVATION:
      return merge({}, state, {[action.reservation.id]: action.reservation});
    default:
      return state;
  }
};

export default reservationReducer;
