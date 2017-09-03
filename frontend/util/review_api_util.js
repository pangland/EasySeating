export const fetchAllReviews = (data) => {
  return $.ajax({
    method: 'GET',
    url: `/api/reviews/`,
    data: { data }
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
