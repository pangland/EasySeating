json.extract! @user, :id, :username

json.array! @past_reservations do |reservation|
  json.extract! reservation, :id, :slot, :date
end

json.array! @upcoming_reservations do |reservation|
  json.extract! reservation, :id, :slot, :date
end
