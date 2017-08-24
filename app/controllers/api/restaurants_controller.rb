class Api::RestaurantsController < ApplicationController
  def show
    @restaurant = Restaurant.find(params[:id])
  end

  def index
    @restaurants = Restaurant.all
  end

  def create
    @restaurant = Restaurant.new(restaurant_params)
    @restaurant.rating = 0;

    if @restaurant.save
      render 'api/restaurants/show'
    else
      render json: @restaurant.errors.full_messages, status: 401
    end
  end

  def update
  end

  def destroy
  end

  private

  def restaurant_params
    params.require(:restaurant).permit(:name, :description, :image_url, :price, :cuisine, :hours)
  end
end
