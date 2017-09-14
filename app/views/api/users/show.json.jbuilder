json.extract! @user, :id, :username

json.array! @reservations do |reservation|
  json.extract! reservation, :id, :slot, :date
  # json.reviewed = reservation.review.exists? ? true : false
end
