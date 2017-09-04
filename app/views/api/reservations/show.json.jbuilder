json.extract! @reservation, :id, :date
json.time @reservation.slot.time
