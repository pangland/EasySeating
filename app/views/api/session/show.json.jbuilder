json.session do
  json.partial! 'api/session/user', user: @user
end

# json.reservations @user.reservations do |reservation|
#   json.res_id reservation.id
#   json.extract! reservation, :id, :date
#   json.time reservation.slot.time
# end

json.reservations do
  json.array! @user.reservations do |reservation|
    json.set! reservation.id do
      json.extract! reservation, :id, :user_id, :date
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
  end
end


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

json.favorites do
  json.array! @user.favorites do |favorite|
    json.set! favorite.id do
      json.extract! favorite, :id, :user_id, :restaurant_id
      json.name favorite.restaurant.name
      json.image favorite.restaurant.image_url
      json.cuisine favorite.restaurant.cuisine
      json.rating favorite.get_rating
    end
  end
end
