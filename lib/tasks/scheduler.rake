desc "This task is called by the Heroku scheduler add-on"
task new_reservations: :environment do
  Restaurant.all.each do |restaurant|
    restaurant.slots.each do |slot|
      Reservation.create!(
        slot_id: slot.id, date:
        Slot.last.time.to_date + 8)
    end
  end

  Reservation.where('user_id IS NULL')
    .where('date < ?', Time.now.getlocal('-00:00').to_date)
    .destroy_all
end
