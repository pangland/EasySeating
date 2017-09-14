class Restaurant < ApplicationRecord
  include PgSearch
  # pg_search_scope :search_name, :against => [:name, :cuisine], :using => [:tsearch, :trigram, :dmetaphone]
  pg_search_scope :search_name, :against => [:name, :cuisine]


  validates :name, :description, :rating, :price, :hours, :cuisine, presence: true

  has_many :slots
  has_many :reservations, through: :slots
  has_many :reviews, through: :reservations
  has_many :favorites

  def self.text_search(query)
    return self.where("similarity(name, ?) > 0.2", query)
        .order("similarity(name,
        #{ActiveRecord::Base.connection.quote(query)}) DESC").limit(10)
  end

  def get_reservations(data)
    time = Time.parse(data[:time]).utc

    reservations = Reservation.where(slot_id: Slot
      .where('time >= ? AND time <= ? AND restaurant_id = ?',
      time - 1.hours, time + 1.hours, self.id).pluck(:id))
      .where('date = ? AND user_id IS NULL',
      data[:date].to_date).includes(:slot)

    reservations
  end
end
