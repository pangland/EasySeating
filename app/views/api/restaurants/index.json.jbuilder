json.restaurants do
  json.array! @restaurants do |restaurant|
    json.partial! 'api/restaurants/restaurant', restaurant: restaurant
    json.reviews restaurant.reviews do |review|
      json.extract! review, :id, :reservation_id, :rating, :food, :service,
                    :ambience, :value, :body
      json.date review.reservation.date
      json.username review.user.username
    end

    json.reservations do
      json.array! restaurant.get_reservations(@data) do |reservation|
        json.extract! reservation, :id
      end
    end
  end
end

json.reservations do
  json.array! @reservations do |reservation|
    json.set! reservation.id do
      json.extract! reservation, :id, :date
      json.time reservation.slot.time
      json.name reservation.slot.restaurant.name
      json.image_url reservation.slot.restaurant.image_url
      json.restaurant_id reservation.slot.restaurant.id
    end
  end
end
