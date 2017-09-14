class Reservation < ApplicationRecord
  belongs_to :slot
  belongs_to :user
  has_one :review

  def get_reservations(data)
    Reservation.where(slot_id: Slot.where('time >= ? AND time <= ? AND restaurant_id = ?',
      time - 1.hours, time + 1.hours, data[:restaurantId].to_i)
      .pluck(:id)).where('date = ? AND user_id IS NULL',
      data[:date].to_date).includes(:slot)
  end

  def favorited?
    !!Favorite.find_by(user_id: self.user_id, restaurant_id: self.slot.restaurant_id)
  end
end
