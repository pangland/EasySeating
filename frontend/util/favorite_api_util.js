export const createFavorite = (favorite) => {
  return $.ajax({
    method: 'POST',
    url: '/api/favorites/',
    data: {favorite}
  });
};

export const fetchAllFavorites = (data) => {
 return $.ajax({
    method: 'GET',
    url: `/api/favorites/`,
    data: { data }
  });
};
