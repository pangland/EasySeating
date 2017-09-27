json.review do
  json.extract! @review, :id, :reservation_id, :rating, :food, :service,
              :ambience, :value, :body
end

favorite = Favorite.find_by(restaurant_id: @review.restaurant.id)

json.favorite do
  if favorite.nil?
    json.favorite false
  else
    json.favorite favorite.id
  end
end
