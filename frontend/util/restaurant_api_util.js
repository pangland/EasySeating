export const fetchAllRestaurants = (restaurantId) => {
 return $.ajax({
    method: 'GET',
    url: `/api/restaurants/`
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
