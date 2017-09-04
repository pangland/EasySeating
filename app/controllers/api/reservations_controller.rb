class Api::ReservationsController < ApplicationController
  def index
    # Time.parse(params[:data][:time]).getutc
    # time = params[:data][:time].to_time;
    time = Time.parse(params[:data][:time]).utc
    @reservations = Reservation.where(slot_id: Slot.where('time >= ? AND time <= ? AND restaurant_id = ?',
      time - 1.hours, time + 1.hours, params[:data][:restaurantId].to_i)
      .pluck(:id)).where('date = ? AND user_id IS NULL',
      params[:data][:date].to_date).includes(:slot)
  end
  
  def create
    reservation = Reservation.find(params[:reservation][:id].to_i)
    reservation.update(user_id: params[:reservation][:user_id].to_i)
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
