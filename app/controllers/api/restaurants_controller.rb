class Api::RestaurantsController < ApplicationController
  def show
    @restaurant = Restaurant.find(params[:id])
  end

  def index
    if params[:data][:search].present?
      temp = Restaurant.search_name(params[:data][:search])
        .joins(:reservations)
        .search_conditions(params[:data])
        .includes(slots: :reservations)

      hash = Hash.new(true)

      @restaurants = []
      temp.each do |el|
        if hash[el]
          @restaurants << el
          hash[el] = false
        end
      end
    else
      @restaurants = Restaurant.distinct.joins(:reservations)
        .search_conditions(params[:data])
    end

    @reservations = Reservation.reservations_in_range(params[:data])

    @data = params[:data]
    render :index
  end

  def search
    @restaurants = Restaurant.text_search(params[:data])
    cuisines = ['American', 'Chinese', 'French', 'Italian', 'Japanese',
                'Mexican', 'Pizza']

    @cuisines = cuisines.select do |el|
      params[:data].length >= 3 && el.include?(params[:data])
    end
  end

  def create
    @restaurant = Restaurant.new(restaurant_params)
    @restaurant.rating = 0

    if @restaurant.save
      time = @restaurant.hours == '0' ? '11:00'.to_time : '7:30'.to_time
      final_time = @restaurant.hours == '0' ? '10:00 p.m.'.to_time : '9:00 p.m.'.to_time

      until time == final_time
        Slot.create(restaurant_id: @restaurant.id, seats: 2, time: time)
        time += 30.minutes
      end
      Slot.create(restaurant_id: @restaurant.id, seats: 2, time: time)

      @restaurant.slots.each do |slot|
        5.times do |i|
          Reservation.create(slot_id: slot.id, date: Date.today + i)
        end
      end

      render 'api/restaurants/show'
    else
      render json: @restaurant.errors.full_messages, status: 401
    end
  end

  private

  def restaurant_params
    params.require(:restaurant)
      .permit(:name, :description, :image_url, :price, :cuisine, :hours)
  end
end
