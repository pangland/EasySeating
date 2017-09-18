import { RECEIVE_ALL_RESERVATIONS,
  RECEIVE_SINGLE_RESERVATION } from '../actions/reservation_actions';

import { RECEIVE_CURRENT_USER,
  REMOVE_CURRENT_USER} from '../actions/session_actions';

import merge from 'lodash/merge';

const reservationReducer = (state = {}, action) => {
  Object.freeze(state)

  switch (action.type) {
    // case RECEIVE_CURRENT_USER:
    //   // const existingReservations = action.currentUser.reservations.reduce((acc, entry) => {
    //   //   acc[entry.id] = entry;
    //   //   return acc;
    //   // }, {});
    //   //
    //   //
    //   // return existingReservations;
    //   return merge({}, state, action.currentUser.reservations);
    case RECEIVE_ALL_RESERVATIONS:
      return merge({}, state, action.reservations);
    case RECEIVE_SINGLE_RESERVATION:
      return merge({}, state, {[action.reservation.id]: action.reservation});
    case REMOVE_CURRENT_USER:
      return {};
    default:
      return state;
  }
};

export default reservationReducer;
