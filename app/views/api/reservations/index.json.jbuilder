json.reservations @reservations.each do |reservation|
  json.extract! reservation, :id, :slot, :date
end
