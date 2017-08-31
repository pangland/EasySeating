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

  def get_reservations(query)
    time = Time.parse(params[:data][:time]).utc
    self.slots.where('time >= ? AND time <= ?', )

    joins(:reservations)

    Slot.where('time >= ? AND time <= ? AND restaurant_id = ?', time - 1.hours,
                time + 1.hours).joins(:reservations)
    #   time - 1.hours, time + 1.hours, params[:data][:restaurantId].to_i)
  end
end
