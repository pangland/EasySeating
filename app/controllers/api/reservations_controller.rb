class Api::ReservationsController < ApplicationController
  def index
  end

  def searchRes
    @reservations = Reservation.reservations_of_restaurant(params[:data])
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
