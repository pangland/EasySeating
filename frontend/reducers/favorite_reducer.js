import { RECEIVE_ALL_FAVORITES,
  RECEIVE_SINGLE_FAVORITE } from '../actions/favorite_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_SINGLE_REVIEW } from '../actions/review_actions';

import merge from 'lodash/merge';

const favoriteReducer = (state = {}, action) => {
  Object.freeze(state)

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      // const existingReservations = action.currentUser.favorites.reduce((acc, entry) => {
      //   acc[entry.id] = entry;
      //   return acc;
      // }, {});
      //
      //
      // return existingReservations;
      debugger
      const obj = action.favorites.reduce((acc, cur, i) => {
        acc[Object.keys(cur)[0]] = Object.values(cur)[0];
        return acc;
      }, {});
      // return merge({}, state, action.favorites);
      return merge({}, state, obj);
      // return merge({}, state, action.favorites);
    case RECEIVE_ALL_FAVORITES:
      return merge({}, state, action.favorites);
      // return merge({}, state, obj);
    case RECEIVE_SINGLE_FAVORITE:
      return merge({}, state, {[action.favorite.id]: action.favorite});
    default:
      return state;
  }
};

export default favoriteReducer;
