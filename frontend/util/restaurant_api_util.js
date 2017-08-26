export const fetchAllRestaurants = (data) => {
 return $.ajax({
    method: 'GET',
    url: `/api/restaurants/`,
    data: { data }
  });
};

export const searchRestaurants = (data) => {
  debugger
 return $.ajax({
    method: 'GET',
    url: `/api/search/`,
    data: { data }
  });
};

export const fetchSingleRestaurant = (restaurantId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/restaurants/${restaurantId}`
  });
};

export const createRestaurant = (restaurant) => {
  return $.ajax({
    method: 'POST',
    url: '/api/restaurants/',
    data: {restaurant}
  });
};
