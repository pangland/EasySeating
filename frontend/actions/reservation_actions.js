import * as APIUtil from '../util/reservation_api_util';

export const RECEIVE_ALL_RESERVATIONS = 'RECEIVE_ALL_RESERVATIONS';
export const RECEIVE_RESERVATION_SEARCH = 'RECEIVE_RESERVATION_SEARCH';
export const RECEIVE_SINGLE_RESERVATION = 'RECEIVE_SINGLE_RESERVATION';
export const REMOVE_RESERVATIONS = 'REMOVE_RESERVATIONS';

export const receiveAllReservations = (reservations) => {
  return {
    type: RECEIVE_ALL_RESERVATIONS,
    reservations
  };
};

export const receiveReservationSearch = (reservations) => {
  return {
    type: RECEIVE_RESERVATION_SEARCH,
    reservations
  };
};

export const removeReservations = (errors) => {
  return {
    type: REMOVE_RESERVATIONS,
    errors
  };
};

export const receiveSingleReservation = (reservation) => {

  return {
    type: RECEIVE_SINGLE_RESERVATION,
    reservation
  };
};

export const requestAllReservations = (data) => (dispatch) => {
  return APIUtil.fetchAllReservations(data)
    .then(reservations => dispatch(receiveAllReservations(reservations)));
};

export const requestSingleReservation = (id) => (dispatch) => {
  return APIUtil.fetchSingleReservation(id)
    .then(reservation => dispatch(receiveSingleReservation(reservation)));
};

export const searchReservations = data => dispatch => {
  debugger
  return APIUtil.searchReservations(data)
    .then(reservations => dispatch(receiveReservationSearch(reservations)));
};

export const createReservation = reservation => dispatch => {
  return APIUtil.createReservation(reservation).then(reservation =>
    dispatch(receiveSingleReservation(reservation)));
};

export const updateReservation = reservation => dispatch => {
  return APIUtil.updateReservation(reservation)
  .then(reservation => dispatch(receiveSingleReservation(reservation)),
  errors => dispatch(receiveReservationErrors(errors)));
};
