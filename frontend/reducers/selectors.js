import values from 'lodash/values';

export const selectAllRestaurants = state => {
  return values(state.restaurants);
};

// export const selectUserReservations = state => values(state.session.reservations);
export const selectUserReservations = state => values(state.reservations);
export const selectUserFavorites = state => values(state.favorites);


// export const filterRestaurants = (a, b) => {
//   return a.filter((stuff) => {
//     return stuff.indexOf(b) !== -1;
//   });
// };
