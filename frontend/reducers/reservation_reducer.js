import {
  RECEIVE_SINGLE_RESERVATION } from '../actions/reservation_actions.js';

import merge from 'lodash/merge';

const reservationReducer = (state = {}, action) => {
  Object.freeze(state)
  
  switch (action.type) {
    case RECEIVE_SINGLE_RESERVATION:
      return merge({}, state, {[action.reservation.id]: action.reservation});
    default:
      return state;
  }
};

export default reservationReducer;
