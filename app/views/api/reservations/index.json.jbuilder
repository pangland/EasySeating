# json.reservations @reservations.each do |reservation|
#   json.extract! reservation, :id, :slot, :date
# end

# json.array! @reservations, :title, :description, :guest_id

json.array! @reservations do |reservation|
  json.extract! reservation, :id, :slot, :date
end
