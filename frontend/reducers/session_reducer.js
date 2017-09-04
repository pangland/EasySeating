import { RECEIVE_ERRORS, RECEIVE_CURRENT_USER, REMOVE_CURRENT_USER,
  REMOVE_ERRORS } from '../actions/session_actions';
import {
  RECEIVE_SINGLE_RESERVATION } from '../actions/reservation_actions.js';

import merge from 'lodash/merge';

const sessionReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      const safeUser = (({id, username}) => ({id, username}))(action.currentUser);
      return merge({}, state, safeUser);
    case REMOVE_CURRENT_USER:
      return {};
    case RECEIVE_SINGLE_RESERVATION:
      if (typeof state.reservation === 'undefined') {
        return merge({}, state, {reservations: {[action.reservation.id]: action.reservation}});
      } else {
        const newReservations = merge({}, state.reservations, {[action.reservation.id]: action.reservation});
        return merge({}, state, newReservations);
      }
    default:
      return state;
  }
};

export default sessionReducer;


// const defaultState = {
//   currentUser: null,
//   errors: []
// };
//
// const sessionReducer = (state = defaultState, action) => {
//   switch (action.type) {
//     case RECEIVE_CURRENT_USER:
//       const safeUser = (({id, username }) => ({ id, username }))(action.currentUser);
//       return merge({}, state, { currentUser: safeUser });
//     case RECEIVE_ERRORS:
//       return Object.assign({}, state, { errors: action.errors });
//     case REMOVE_ERRORS:
//       return Object.assign({}, state, { errors: []});
//     case REMOVE_CURRENT_USER:
//       return defaultState;
//     default:
//       return state;
//   }
// };
//
// export default sessionReducer;
