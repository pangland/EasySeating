class Api::ReservationsController < ApplicationController
  def index
    debugger
    # Time.parse(params[:data][:time]).getutc
    selected_time = params[:data][:time].to_time;
    @slots = Slot.where('time >= ? AND time <= ? AND restaurant_id = ?',
      selected_time-2.hours, selected_time + 2.hours,
      params[:data][:restaurant_id])

    @reservations.where('date = ? AND slot_id IN ', )
  end

  def search
  end

  def show
  end
end
