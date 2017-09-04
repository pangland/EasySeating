json.extract! @user, :id, :username

json.array! @reservations do |reservation|
  json.extract! reservation, :id, :slot, :date
end
