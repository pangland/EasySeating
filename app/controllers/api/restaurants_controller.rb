class Api::RestaurantsController < ApplicationController
  def show
    @restaurant = Restaurant.find(params[:id])
  end

  def index
    s_time = DateTime.parse("#{params[:data][:time]} -0500")
    preadjusted_date = s_time.to_date
    s_time = s_time.getlocal('-00:00')
    post_adjusted_date = s_time.to_date
    s_time = Time.parse(params[:data][:date] + " " + s_time.to_s[11..-1])
    c_time = Time.now.getlocal('-00:00')
    offset_selected = s_time.to_date - Slot.first.time.to_date  - (post_adjusted_date - preadjusted_date)
    offset_current = c_time.to_date - Slot.first.time.to_date + (s_time.to_date - c_time.to_date);

    #

    if params[:data][:search].present?
      # @restaurants = Restaurant.search_name(params[:data][:search])
      # .includes(slots: :reservations)
      temp = Restaurant.search_name(params[:data][:search])
        .joins(:reservations)
        .where('time > ?', c_time - offset_current.days)
        .where('time >= ?', s_time - offset_selected.days - 1.hours)
        .where('time <= ?', s_time - offset_selected.days + 1.hours)
        .where('seats = ?', params[:data][:seats])
        .where('user_id IS NULL')
        .where('date = ?', params[:data][:date].to_date)
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
        .where('time > ?', c_time - offset_current.days)
        .where('time >= ?', s_time - offset_selected.days - 1.hours)
        .where('time <= ?', s_time - offset_selected.days + 1.hours)
        .where('seats = ?', params[:data][:seats])
        .where('user_id IS NULL')
        .where('date = ?', params[:data][:date].to_date)
    end
    # restaurant_ids = @restaurants.pluck(:id)
    # @restaurants = @restaurants.includes(slots: :reservations)

    @reservations = Reservation.where(slot_id: Slot
      .where('time > ?', c_time - offset_current.days)
      .where('time >= ?', s_time - offset_selected.days - 1.hours)
      .where('time <= ?', s_time - offset_selected.days + 1.hours)
      .where('seats = ?', params[:data][:seats]))
      .where('user_id IS NULL').includes(:slot)
      .where('date = ?', params[:data][:date].to_date)
      .includes(:restaurant)

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
          Reservation.create(slot_id: slot.id, date: Date.today + i);
        end
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
