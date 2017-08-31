@restaurants.each do |restaurant|
  json.set! restaurant.id do
    json.partial! 'api/restaurants/restaurant', restaurant: restaurant
  end

  # json.array!

  # json.reservations do
  #   json.array! restaurant.get_reservations(@data).includes(:slots) do
  #     json.extract! reservation, :id, :slot, :date
  #   end
  # end
end
