json.partial! 'api/restaurants/restaurant', restaurant: @restaurant
json.reviews @restaurant.reviews do |review|
  json.extract! review, :id, :reservation_id, :rating, :food, :service,
                :ambiance, :value, :body
  json.username = review.user.username
end
