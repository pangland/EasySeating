json.reservations @reservations.each do |reservation|
  json.extract! reservation, :id, :slot_id, :date
end
