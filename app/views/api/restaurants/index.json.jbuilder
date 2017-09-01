@restaurants.each do |restaurant|
  json.set! restaurant.id do
    json.partial! 'api/restaurants/restaurant', restaurant: restaurant

    json.reservations do
      json.array! restaurant.get_reservations(@data) do |res|
        json.extract! res, :id, :slot_id, :date
        json.time res.slot.time
      end
    end
  end
  # json.array!
end
