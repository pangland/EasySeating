import { RECEIVE_ALL_FAVORITES,
  RECEIVE_SINGLE_FAVORITE } from '../actions/favorite_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

import merge from 'lodash/merge';

const favoriteReducer = (state = {}, action) => {
  Object.freeze(state)

  switch (action.type) {
    // case RECEIVE_CURRENT_USER:
    //   // const existingReservations = action.currentUser.favorites.reduce((acc, entry) => {
    //   //   acc[entry.id] = entry;
    //   //   return acc;
    //   // }, {});
    //   //
    //   //
    //   // return existingReservations;
    //   return merge({}, state, action.currentUser.favorites);
    case RECEIVE_ALL_FAVORITES:
      return merge({}, state, action.favorites);
    case RECEIVE_SINGLE_FAVORITE:
      
      return merge({}, state, {[action.favorite.id]: action.favorite});
    default:
      return state;
  }
};

export default favoriteReducer;
