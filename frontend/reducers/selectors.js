import values from 'lodash/values';

export const selectAllRestaurants = state => {
  return values(state);
};

export const filterRestaurants = (a, b) => {
  return a.filter((stuff) => {
    return stuff.indexOf(b) !== -1;
  });
};
