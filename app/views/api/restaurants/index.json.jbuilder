@restaurants.each do |restaurant|
  json.set! restaurant.id do
    json.partial! 'api/restaurants/restaurant', restaurant: restaurant

    json.reservations do
      json.array! restaurant.get_reservations(@data) do |reservation|
        json.extract! reservation, :id, :slot_id, :date
        json.time reservation.slot.time
        json.seats reservation.slot.seats
        json.name reservation.slot.restaurant.name
        json.image_url reservation.slot.restaurant.image_url
        json.restaurant_id reservation.slot.restaurant.id
        json.reviewed reservation.review.nil? ? false : true
        json.favorited reservation.favorited? ? true : false
      end
    end
  end
  # json.array!
end
