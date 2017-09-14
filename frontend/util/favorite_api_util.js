export const createFavorite = (favorite) => {
  return $.ajax({
    method: 'POST',
    url: '/api/favorites/',
    data: {favorite}
  });
};
