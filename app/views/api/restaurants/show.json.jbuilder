json.partial! 'api/restaurants/restaurant', restaurant: @restaurant
json.reviews @restaurant.reviews do |review|
  json.extract! review, :id, :reservation_id, :rating, :food, :service,
                :ambience, :value, :body
  json.date review.reservation.date
  json.username review.user.username
end
