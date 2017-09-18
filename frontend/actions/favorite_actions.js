import * as APIUtil from '../util/favorite_api_util';

export const RECEIVE_ALL_FAVORITES = 'RECEIVE_ALL_FAVORITES';
export const RECEIVE_SINGLE_FAVORITE = 'RECEIVE_SINGLE_FAVORITE';

export const receiveAllFavorites = (favorites) => {
  return {
    type: RECEIVE_ALL_FAVORITES,
    favorites
  };
};

export const receiveSingleFavorite = (favorite) => {
  debugger
  return {
    type: RECEIVE_SINGLE_FAVORITE,
    favorite
  };
};

export const createFavorite = favorite => dispatch => {
  return APIUtil.createFavorite(favorite)
    .then(favorite => dispatch(receiveSingleFavorite(favorite)));
};

export const requestAllFavorites = (data) => (dispatch) => {
  return APIUtil.fetchAllFavorites(data)
    .then(reservations => dispatch(receiveAllFavorites(reservations)));
};
