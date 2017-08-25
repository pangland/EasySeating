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
