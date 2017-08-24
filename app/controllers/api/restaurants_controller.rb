class Api::RestaurantsController < ApplicationController
  def show
    @restaurant = Restaurant.find(params[:id])
  end

  def index
    @restaurants = Restaurant.all
  end

  def create
    @restaurant = Restaurant.new(restaurant_params)

    if @restaurant.save
      render :create
    else
      render json: @restaurant.errors.full_message, status: 401
    end
  end

  def update
  end

  def destroy
  end
end
