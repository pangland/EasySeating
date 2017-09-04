json.extract! user, :id, :username

json.reservations user.reservations do |reservation|
  json.res_id reservation.id
  json.extract! reservation, :id, :date
  json.time reservation.slot.time
end