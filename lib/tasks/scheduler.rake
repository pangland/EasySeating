desc "This task is called by the Heroku scheduler add-on"
task new_reservations: :environment do
  Restaurant.all.each do |restaurant|
    restaurant.slots.each do |slot|
      first_date = Slot.first.time.to_date
      slot_date = slot.time.to_date
      current_date = Time.now.getlocal('-00:00').to_date

      increment = slot_date == first_date ? 0 : 1

      Reservation.create!(
        slot_id: slot.id,
        date: slot_date + (current_date - slot_date + 8 + increment)
      )
    end
  end

  Reservation.where('user_id IS NULL')
    .where('date < ?', Time.now.getlocal('-00:00').to_date - 1)
    .destroy_all
end

# Slot.last.time.to_date
