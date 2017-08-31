import values from 'lodash/values';

export const selectAllRestaurants = state => values(state.restaurants);

// export const filterRestaurants = (a, b) => {
//   return a.filter((stuff) => {
//     return stuff.indexOf(b) !== -1;
//   });
// };
