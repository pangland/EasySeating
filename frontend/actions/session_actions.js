import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
export const REMOVE_ERRORS = 'REMOVE_ERRORS';

export const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  };
};

export const removeCurrentUser = (currentUser) => {
  return {
    type: REMOVE_CURRENT_USER,
    currentUser
  };
};

export const receiveErrors = (errors) => {
  return {
      type: RECEIVE_ERRORS,
      errors: errors.responseJSON
  };
};

export const removeErrors = (errors) => {
  return {
    type: REMOVE_ERRORS,
    errors
  };
};


export const signup = user => dispatch => {
  debugger
  return APIUtil.signup(user)
    .then(user => dispatch(receiveCurrentUser(user)),
    errors => dispatch(receiveErrors(errors)));
};

export const login = user => dispatch => {
  return APIUtil.login(user)
    .then(user => dispatch(receiveCurrentUser(user)),
    errors => dispatch(receiveErrors(errors)));
};

export const logout = () => dispatch => {
  return APIUtil.logout()
    .then((user) => dispatch(removeCurrentUser(null)));
};
