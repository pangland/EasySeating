@restaurants.each do |restaurant|
  json.set! restaurant.id do
    json.partial! 'api/restaurants/restaurant', restaurant: restaurant

    json.reservations do
      json.array! restaurant.get_reservations(@data), :id, :slot_id, :date
    end
  end
  # json.array!
end
