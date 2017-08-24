@restaurants.each do |restaurant|
  json.set! bench.id do
    json.partial! 'api/restaurants/restaurant', restaurant: restaurant
  end
end
