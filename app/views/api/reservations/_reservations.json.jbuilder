
json.array! reservations do |reservation|
  json.extract! reservation, :id, :date
  json.time reservation.slot.time
  json.seats reservation.slot.seats
  json.name reservation.slot.restaurant.name
  json.image_url reservation.slot.restaurant.image_url
  json.restaurant_id reservation.slot.restaurant.id
  json.reviewed reservation.review.nil? ? false : true
  json.favorited reservation.favorited? ? true : false

  if reservation.review
    json.review do
      json.extract! reservation.review, :id, :rating, :food, :service,
        :ambience, :value, :body
    end
  end
end
