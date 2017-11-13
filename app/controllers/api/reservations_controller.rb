class Api::ReservationsController < ApplicationController
  def index
    # Time.parse(params[:data][:time]).getutc
    # time = params[:data][:time].to_time;
    # time = Time.parse(params[:data][:time]).utc
    # @reservations = Reservation.where(slot_id: Slot.where('time >= ? AND time <= ? AND restaurant_id = ?',
    #   time - 1.hours, time + 1.hours, params[:data][:restaurantId].to_i)
    #   .pluck(:id)).where('date = ? AND user_id = ?',
    #   params[:data][:date].to_date, User.first.id).includes(:slot)
  end

  def searchRes
    s_time = DateTime.parse("#{params[:data][:time]} -0500")
    preadjusted_date = s_time.to_date
    s_time = s_time.getlocal('-00:00')
    post_adjusted_date = s_time.to_date
    s_time = Time.parse(params[:data][:date] + " " + s_time.to_s[11..-1])
    c_time = Time.now.getlocal('-00:00')
    offset_selected = s_time.to_date - Slot.first.time.to_date  - (post_adjusted_date - preadjusted_date)
    offset_current = c_time.to_date - Slot.first.time.to_date + (s_time.to_date - c_time.to_date)

    @reservations = Reservation.where(slot_id: Slot
      .where('time > ?', c_time - offset_current.days)
      .where('time >= ?', s_time - offset_selected.days - 1.hours)
      .where('time <= ?', s_time - offset_selected.days + 1.hours)
      .where('seats = ?', params[:data][:seats])
      .where('restaurant_id = ?', params[:data][:restaurantId].to_i))
      .where('date = ?', params[:data][:date].to_date)
      .where('user_id IS NULL').includes(:slot)
      .order('slots.time').limit(5).includes(:restaurant)




  end

  def create
    @reservation = Reservation.find(params[:reservation][:id].to_i)
    @reservation.update(user_id: params[:reservation][:user_id].to_i)
    render 'api/reservations/show'
  end

  def update
    @reservation = Reservation.find(params[:reservation][:id].to_i)
    @reservation.update(user_id: params[:reservation][:user_id].to_i)
    render 'api/reservations/show'
  end

  def show
  end
end

#<Reservation id: 2, user_id: nil, date: "2017-08-31", slot_id: 1, created_at: "2017-08-30 13:02:40", updated_at: "2017-08-30 13:02:40">,
#<Reservation id: 7, user_id: nil, date: "2017-08-31", slot_id: 2, created_at: "2017-08-30 13:02:40", updated_at: "2017-08-30 13:02:40">,
#<Reservation id: 12, user_id: nil, date: "2017-08-31", slot_id: 3, created_at: "2017-08-30 13:02:40", updated_at: "2017-08-30 13:02:40">,
#<Reservation id: 17, user_id: nil, date: "2017-08-31", slot_id: 4, created_at: "2017-08-30 13:02:41", updated_at: "2017-08-30 13:02:41">,
#<Reservation id: 22, user_id: nil, date: "2017-08-31", slot_id: 5, created_at: "2017-08-30 13:02:41", updated_at: "2017-08-30 13:02:41">,
#<Reservation id: 27, user_id: nil, date: "2017-08-31", slot_id: 6, created_at: "2017-08-30 13:02:41", updated_at: "2017-08-30 13:02:41">]>
