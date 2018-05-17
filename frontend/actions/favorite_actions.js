import * as APIUtil from '../util/favorite_api_util';

export const RECEIVE_ALL_FAVORITES = 'RECEIVE_ALL_FAVORITES';
export const RECEIVE_SINGLE_FAVORITE = 'RECEIVE_SINGLE_FAVORITE';
export const REMOVE_SINGLE_FAVORITE = 'REMOVE_SINGLE_FAVORITE';

export const receiveAllFavorites = (favorites) => {
  return {
    type: RECEIVE_ALL_FAVORITES,
    favorites
  };
};

export const receiveSingleFavorite = (favorite) => {

  return {
    type: RECEIVE_SINGLE_FAVORITE,
    favorite
  };
};

export const removeSingleFavorite = (favorite) => {
  return {
    type: REMOVE_SINGLE_FAVORITE,
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

export const removeFavorite = (favorite) => dispatch => {
  return APIUtil.removeFavorite(favorite)
    .then((user) => dispatch(removeSingleFavorite(favorite)));
};
