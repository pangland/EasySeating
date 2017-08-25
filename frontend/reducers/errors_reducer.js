import { REMOVE_ERRORS, RECEIVE_ERRORS } from '../actions/session_actions';
import merge from 'lodash/merge';

const errorsReducer = (state = [], action) => {
  switch(action.type) {
    case REMOVE_ERRORS:
      return [];
    case RECEIVE_ERRORS:
      return action.errors;
    default:
      return state;
  }
};

export default errorsReducer;
