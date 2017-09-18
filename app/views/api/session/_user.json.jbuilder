json.extract! user, :id, :username

# user.reservations.each do |reservation|
#   json.reservations do
#     json.set! reservation.id do
#       json.extract! reservation, :id, :date
#       json.time reservation.slot.time
#       json.seats reservation.slot.seats
#       json.name reservation.slot.restaurant.name
#       json.image_url reservation.slot.restaurant.image_url
#       json.restaurant_id reservation.slot.restaurant.id
#       json.reviewed reservation.review.nil? ? false : true
#       json.favorited reservation.favorited? ? true : false
#
#       if reservation.review
#         json.review do
#           json.extract! reservation.review, :id, :rating, :food, :service,
#             :ambience, :value, :body
#         end
#       end
#     end
#   end
# end

# json.favorites do
#   json.array! user.favorites do |favorite|
#     json.extract! favorite, :id, :user_id, :restaurant_id
#     json.name favorite.restaurant.name
#     json.image favorite.restaurant.image_url
#     json.cuisine favorite.restaurant.cuisine
#     json.rating favorite.get_rating
#   end
# end

# json.reviews do
#   json.array! user.reviews do |review|
#     json.set! review.id do
#       json.extract! review, :id, :rating, :food, :service, :ambience, :value, :body
#     end
#   end
# end

# json.reservations user.reservations do |reservation|
#   json.res_id reservation.id
#   json.extract! reservation, :id, :date
#   json.time reservation.slot.time
# end

# @restaurants.each do |restaurant|
#   json.set! restaurant.id do
#     json.partial! 'api/restaurants/restaurant', restaurant: restaurant
#
#     json.reservations do
#       json.array! restaurant.get_reservations(@data) do |res|
#         json.extract! res, :id, :slot_id, :date
#         json.time res.slot.time
#       end
#     end
#   end
#   # json.array!
# end
