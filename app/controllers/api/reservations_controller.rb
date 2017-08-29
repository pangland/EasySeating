class Api::ReservationsController < ApplicationController
  def index
    debugger
    # Time.parse(params[:data][:time]).getutc
    selected_time = params[:data][:time].to_time;
    @slots = Slot.where('time > ? AND time < ? AND restaurant_id = ?',
      selected_time-2.hours-1.minute, selected_time + 2.hours+1.minute,
      params[:data][:restaurant_id])
  end

  def search
  end

  def show
  end
end
