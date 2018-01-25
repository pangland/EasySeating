@reservations = [] unless @reservations
json.extract! @user, :id, :username

json.array! @reservations do |reservation|
  json.extract! reservation, :id, :slot, :date
    # json.reviewed = reservation.review.exists? ? true : false
end

# json.reviews @restaurant.reviews do |review|
#   json.extract! review, :id, :reservation_id, :rating, :food, :service,
#                 :ambience, :value, :body
#   json.date review.reservation.date
#   json.username review.user.username

# json.reservations do
#   json.array! @user.reservations do |reservation|
#     json.set! reservation.id do
#       json.extract! reservation, :id, :user_id, :date
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
