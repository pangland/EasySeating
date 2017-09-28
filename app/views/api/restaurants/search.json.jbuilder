# json.restaurants @restaurants.each do |restaurant|
#   json.extract! restaurant, :id, :name, :cuisine, :rating
# end

json.restaurants do
  json.array! @restaurants do |restaurant|
    json.extract! restaurant, :id, :name, :cuisine, :rating
  end
end

json.cuisines do
  json.array! @cuisines do |cuisine|
    json.cuisine cuisine
    json.is_cuisine false
  end
end

# json.reservations @reservations.each do |reservation|
#   json.extract! reservation, :id, :slot, :date
# end

# json.array! @reservations, :title, :description, :guest_id

# json.array! @reservations do |reservation|
#   json.extract! reservation, :id, :slot, :date
# end
