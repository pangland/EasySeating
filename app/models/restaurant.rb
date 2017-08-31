class Restaurant < ApplicationRecord
  include PgSearch
  # pg_search_scope :search_name, :against => [:name, :cuisine], :using => [:tsearch, :trigram, :dmetaphone]
  pg_search_scope :search_name, :against => [:name, :cuisine]


  validates :name, :description, :rating, :price, :hours, :cuisine, presence: true

  has_many :slots

  has_many :reservations,
    through: :slots,
    source: :reservations

  def self.text_search(query)
    return self.where("similarity(name, ?) > 0.1", query)
      .order("similarity(name, #{ActiveRecord::Base.connection.quote(query)}) DESC")
      .limit(10)
  end

  def get_reservations(data)
    time = Time.parse(data[:time]).utc

    Reservation.where(slot_id: Slot
      .where('time >= ? AND time <= ? AND restaurant_id = ?',
      time - 1.hours, time + 1.hours, self.id).pluck(:id))
      .where('date = ? AND user_id IS NULL',
      data[:date].to_date).includes(:slot)
  end

  def self.sql_version(data)
    Restaurant.find_by_sql(
      "SELECT restaurants.name, restaurant.cuisine, slots.time, reservation.id
      FROM restaurants
      JOIN slots ON restaurants.id = slots.restaurant_id
      JOIN reservations ON slots.id = reservation.slots_id
      WHERE

      "
    )
  end
end
