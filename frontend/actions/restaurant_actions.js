import * as APIUtil from '../util/restaurant_api_util';

export const RECEIVE_ALL_RESTAURANTS = 'RECEIVE_ALL_RESTAURANTS';
export const RECEIVE_RESTAURANT_SEARCH = 'RECEIVE_RESTAURANT_SEARCH';
export const RECEIVE_RESTAURANT_FILTER = 'RECEIVE_RESTAURANT_FILTER';
export const RECEIVE_SINGLE_RESTAURANT = 'RECEIVE_SINGLE_RESTAURANT';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const REMOVE_ERRORS = 'REMOVE_ERRORS';

export const RECEIVE_RESTAURANT_ERRORS = 'RECEIVE_RESTAURANT_ERRORS';
export const REMOVE_RESTAURANT_ERRORS = 'REMOVE_RESTAURANT_ERRORS';
export const REMOVE_SEARCHED_RESTAURANTS = 'REMOVE_SEARCHED_RESTAURANTS';
export const SET_SELECTED = 'SET_SELECTED';

export const receiveAllRestaurants = (restaurants) => {
  return {
    type: RECEIVE_ALL_RESTAURANTS,
    restaurants
  };
};

export const receiveRestaurantSearch = (restaurants) => {
  return {
    type: RECEIVE_RESTAURANT_SEARCH,
    restaurants
  };
};

export const setSelected = (id) => {
  return {
    type: SET_SELECTED,
    id
  };
};

export const receiveRestaurantFilter = (restaurants) => {
  return {
    type: RECEIVE_RESTAURANT_FILTER,
    restaurants
  };
};


export const receiveSingleRestaurant = (restaurant) => {
  return {
    type: RECEIVE_SINGLE_RESTAURANT,
    restaurant
  };
};

export const receiveRestaurantErrors = (errors) => {
  return {
      type: RECEIVE_RESTAURANT_ERRORS,
      errors: errors.responseJSON
  };
};

export const removeRestaurantErrors = (errors) => {
  return {
    type: REMOVE_RESTAURANT_ERRORS,
    errors
  };
};

export const removeSearchedRestaurants = (restaurants) => {
  return {
    type: REMOVE_SEARCHED_RESTAURANTS,
    restaurants
  };
};

export const requestAllRestaurants = (data) => (dispatch) => {
  return APIUtil.fetchAllRestaurants(data)
    .then(restaurants => dispatch(receiveAllRestaurants(restaurants)));
};

export const requestSingleRestaurant = (id) => (dispatch) => {
  return APIUtil.fetchSingleRestaurant(id)
    .then(restaurant => dispatch(receiveSingleRestaurant(restaurant)));
};

export const searchRestaurants = data => dispatch => {
  return APIUtil.searchRestaurants(data)
    .then(restaurants => dispatch(receiveRestaurantSearch(restaurants)));
};

export const filterRestaurants = data => dispatch => {
  return dispatch(receiveRestaurantFilter(data));
};


export const createRestaurant = restaurant => dispatch => {
  return APIUtil.createRestaurant(restaurant).then(restaurant =>
    dispatch(receiveSingleRestaurant(restaurant)),
    errors => dispatch(receiveRestaurantErrors(errors)));
};
