export const fetchAllReviews = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/reviews/`,
    data: { id }
  });
};

export const fetchSingleReview = (reviewId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/reviews/${reviewId}`
  });
};

export const createReview = (review) => {
  return $.ajax({
    method: 'POST',
    url: '/api/reviews/',
    data: {review}
  });
};
