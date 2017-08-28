class Api::RestaurantsController < ApplicationController
  def show
    @restaurant = Restaurant.find(params[:id])
  end

  def index
    # @restaurants = Restaurant.all
    @restaurants = Restaurant.text_search(params[:data])
  end

  def search
    @restaurants = Restaurant.text_search(params[:data])
    render :search
  end

  def create
    @restaurant = Restaurant.new(restaurant_params)
    @restaurant.rating = 0

    if @restaurant.save
      Slot.create(restaurant_id: @restaurant.id, seats: 2, time: '11:00')
      time = @restaurant.time == '0' ? '11:00'.to_time : '7:30'.to_time
      final_time = @restaurant.time == '0' ? '10:00 p.m.'.to_time : '9:00 p.m.'.to_time

      until time == final_time
        Slot.create(restaurant_id: @restaurant.id, seats: 2, time: time)
        time += 30.minutes
      end

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
