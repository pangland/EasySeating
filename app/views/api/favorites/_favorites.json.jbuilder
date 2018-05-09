json.array! favorites do |favorite|
  json.extract! favorite, :id, :user_id, :restaurant_id
  json.name favorite.restaurant.name
  json.image favorite.restaurant.image_url
  json.cuisine favorite.restaurant.cuisine
  json.rating favorite.get_rating
end
