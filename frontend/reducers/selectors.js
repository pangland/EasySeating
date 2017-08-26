import values from 'lodash/values';

export const selectAllRestaurants = state => values(state.restaurants);
