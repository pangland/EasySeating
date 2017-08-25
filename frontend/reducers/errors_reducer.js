import { RECEIVE_ERRORS, REMOVE_ERRORS } from '../actions/session_actions';

import { RECEIVE_RESTAURANT_ERRORS, REMOVE_RESTAURANT_ERRORS} from        '../actions/restaurant_actions';

import merge from 'lodash/merge';

const defaultState = {
  session: [],
  restaurant: []
};

const errorsReducer = (state = defaultState, action) => {
  switch(action.type) {
    case REMOVE_ERRORS:
      return Object.assign({}, state, { session: []});
    case RECEIVE_ERRORS:
      return Object.assign({}, state, { session: action.errors });
    case REMOVE_RESTAURANT_ERRORS:
      return Object.assign({}, state, { restaurant: []});
    case RECEIVE_RESTAURANT_ERRORS:
      return Object.assign({}, state, { restaurant: action.errors });
    default:
      return state;
  }
};

export default errorsReducer;
