export const fetchAllReservations = (data) => {
 return $.ajax({
    method: 'GET',
    url: `/api/reservations/`,
    data: { data }
  });
};

export const searchReservations = (data) => {
  return $.ajax({
    method: 'GET',
    url: `/api/reservations/`,
    data: { data }
  });
};

export const fetchSingleReservation = (reservationId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/reservations/${reservationId}`
  });
};

export const createReservation = (reservation) => {
  return $.ajax({
    method: 'POST',
    url: '/api/reservations/',
    data: {reservation}
  });
};
