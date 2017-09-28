import values from 'lodash/values';

export const selectAllRestaurants = state => {
  // const seen = {};
  // values(state.restaurants).forEach((el) => {
  //
  // }
  const restaurants = [];
  const names = [];
  return values(state.restaurants).filter((el) => {
    if (names.indexOf(el.name) >= 0) {
      return false;
    } else {
      names.push(el.name);
      return true;
    }
  });


  // 
  // return values(state.restaurants);
};

// export const selectUserReservations = state => values(state.session.reservations);
export const selectUserReservations = state => {
  
  return values(state.reservations);
}

export const selectUserFavorites = state => values(state.favorites);


// export const filterRestaurants = (a, b) => {
//   return a.filter((stuff) => {
//     return stuff.indexOf(b) !== -1;
//   });
// };
