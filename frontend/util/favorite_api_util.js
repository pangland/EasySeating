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

export const removeFavorite = (favorite) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/favorites/${favorite.id}`,
    data: { favorite }
  });
};
