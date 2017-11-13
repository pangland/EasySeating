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
    s_time = Time.parse("#{data[:time]} -0500")
    preadjusted_date = s_time.to_date
    s_time = s_time.getlocal('-00:00')
    post_adjusted_date = s_time.to_date
    s_time = Time.parse(data[:date] + " " + s_time.to_s[11..-1])
    c_time = Time.now.getlocal('-00:00')
    offset_current = c_time.to_date - Slot.first.time.to_date + (s_time.to_date - c_time.to_date)
    offset_selected = s_time.to_date - Slot.first.time.to_date  - (post_adjusted_date - preadjusted_date)
    # reservations = Reservation.where(slot_id: Slot
    #   .where('time >= ? AND time <= ? AND restaurant_id = ?',
    #   time - 1.hours, time + 1.hours, self.id).pluck(:id))
    #   .where('date = ? AND user_id = ?',
    #   data[:date].to_date, User.first.id).includes(:slot).includes(:restaurant)

    reservations = Reservation.where(slot_id: Slot
      .where('time > ?', c_time - offset_current.days)
      .where('time >= ?', s_time - offset_selected.days - 1.hours)
      .where('time <= ?', s_time - offset_selected.days + 1.hours)
      .where('seats = ?', data[:seats])
      .where('restaurant_id = ?', self.id).pluck(:id))
      .where('date = ?', data[:date].to_date)
      .where('user_id IS NULL').includes(:slot)
      # .includes(:restaurant)

    reservations
  end
end
