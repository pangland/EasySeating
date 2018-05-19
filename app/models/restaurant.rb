class Restaurant < ApplicationRecord
  include PgSearch
  include Searchable

  pg_search_scope :search_name, against: %i[name cuisine]

  validates :name, :description, :rating, :price, :hours, :cuisine,
            presence: true

  has_many :slots
  has_many :reservations, through: :slots
  has_many :reviews, through: :reservations
  has_many :favorites

  def self.text_search(query)
    self.where("similarity(name, ?) > 0.2", query)
      .order("similarity(name,
      #{ActiveRecord::Base.connection.quote(query)}) DESC")
      .limit(10)
  end

  def self.search_conditions(data)
    s_time, c_time, offset_current, offset_selected = time_data(data)

    self.where('time > ?', c_time - offset_current.days)
      .where('time >= ?', s_time - offset_selected.days - 1.hours)
      .where('time <= ?', s_time - offset_selected.days + 1.hours)
      .where('seats = ?', data[:seats])
      .where('user_id IS NULL')
      .where('date = ?', data[:date].to_date)
  end

  def update_rating
    new_rating = self.reviews.sum(:rating) / self.reviews.length
    Restaurant.update(self.id, rating: new_rating)
  end

  def get_reservations(data)
    s_time, c_time, offset_current, offset_selected = time_data(data)

    Reservation.where(slot_id: Slot
      .where('time > ?', c_time - offset_current.days)
      .where('time >= ?', s_time - offset_selected.days - 1.hours)
      .where('time <= ?', s_time - offset_selected.days + 1.hours)
      .where('seats = ?', data[:seats])
      .where('restaurant_id = ?', self.id).pluck(:id))
      .where('date = ?', data[:date].to_date)
      .where('user_id IS NULL').includes(:slot)
  end

end
