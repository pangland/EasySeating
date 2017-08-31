# json.restaurants @restaurants.each do |restaurant|
#   json.extract! restaurant, :id, :name, :cuisine, :rating
# end

json.array! @restaurants do |restaurant|
  json.extract! restaurant, :id, :name, :cuisine, :rating
end

# json.reservations @reservations.each do |reservation|
#   json.extract! reservation, :id, :slot, :date
# end

# json.array! @reservations, :title, :description, :guest_id

# json.array! @reservations do |reservation|
#   json.extract! reservation, :id, :slot, :date
# end
