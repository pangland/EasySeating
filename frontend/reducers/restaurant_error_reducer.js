import { RECEIVE_RESTAURANT_ERRORS, REMOVE_RESTAURANT_ERRORS } from '../actions/restaurant_actions';

const restaurantErrorsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_RESTAURANT_ERRORS:
      return action.errors;
    case REMOVE_RESTAURANT_ERRORS:
      return [];
    default:
      return state;
  }
};

export default restaurantErrorsReducer;
