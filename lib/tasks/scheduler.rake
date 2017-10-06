desc "This task is called by the Heroku scheduler add-on"
task new_reservations: :environment do
  Restaurant.all.each do |restaurant|
    restaurant.slots.each do |slot|
      Reservation.create!(
        user_id: User.first.id,
        slot_id: slot.id, date:
        Slot.last.time.to_date + 15)
    end
  end
end
