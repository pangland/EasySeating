import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import restaurantReducer from './restaurant_reducer';
import restaurantErrorsReducer from './restaurant_error_reducer';

export default combineReducers({
  session: sessionReducer,
  restaurants: restaurantReducer,
  restaurantErrors: restaurantErrorsReducer
});
