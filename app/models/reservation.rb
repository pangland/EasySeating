class Reservation < ApplicationRecord
  include Searchable

  belongs_to :slot
  belongs_to :user, optional: true
  has_one :review
  has_one :restaurant, through: :slot

  def self.reservations_in_range(data)
    s_time, c_time, offset_current, offset_selected = time_data(data)

    Reservation.where(slot_id: Slot
      .where('time > ?', c_time - offset_current.days)
      .where('time >= ?', s_time - offset_selected.days - 1.hours)
      .where('time <= ?', s_time - offset_selected.days + 1.hours)
      .where('seats = ?', data[:seats]))
      .where('user_id IS NULL').includes(:slot)
      .where('date = ?', data[:date].to_date)
      .includes(:restaurant)
  end

  def favorited?
    !!Favorite.find_by(
      user_id: self.user_id,
      restaurant_id: self.slot.restaurant_id
    )
  end
end
