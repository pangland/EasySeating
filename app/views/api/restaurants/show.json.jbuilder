json.partial! 'api/restaurants/restaurant', restaurant: @restaurant
json.reviews @restaurant.reviews do |review|
  json.extract! review, :id, :rating, :body
end
