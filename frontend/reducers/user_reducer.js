import { RECEIVE_SINGLE_USER } from '../actions/user_actions';

import merge from 'lodash/merge';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_SINGLE_USER:
      return action.user;
    default:
      return state;
  }
};

export default userReducer;
