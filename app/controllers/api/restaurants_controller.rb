class Api::RestaurantsController < ApplicationController
  def show
    @restaurant = Restaurant.find(params[:id])
  end

  def index
    # Time.now.utc.to_date = today's UTC date
    # Slot.first.utc.to_date


    # THE GOLDEN CODE
    # Restaurant.distinct.joins(:reservations)
    #   .where('time > ?', c_time-offset.days).pluck(:id)
    # THIS IS THE CODE TO WORSHIP AND NOURISH (minus pluck, but right restaurants)

    # restaurants = Restaurant.distinct.joins(:reservations)
    #   .where('time > ?', c_time - offset.days)
    #   .where('time >= ?', s_time - offset.days - 1.hours)
    #   .where('time <= ?', s_time - offset.days + 1.hours)
    #   .where('date = ?', params[:data][:date].to_date)
    #   .where('user_id = ?', User.first.id)
    #   .includes(slots: :reservations)
    s_time = Time.parse("#{params[:data][:time]} -0400")
    s_time = s_time.getlocal('-00:00')
    s_time = Time.parse(params[:data][:date] + " " + s_time.to_s[11..-1])
    c_time = Time.now.getlocal('-00:00')
    offset = c_time.to_date - Slot.first.time.to_date
    # offset = params[:data][:date].to_date - Slot.first.time.to_date

    if params[:data][:search].present?
      # @restaurants = Restaurant.search_name(params[:data][:search])
      # .includes(slots: :reservations)
      @restaurants = Restaurant.search_name(params[:data][:search])
        .distinct.joins(:reservations)
        .where('time > ?', c_time - offset.days)
        .where('time >= ?', s_time - offset.days - 1.hours)
        .where('time <= ?', s_time - offset.days + 1.hours)
        .where('date = ?', params[:data][:date].to_date)
        .where('user_id = ?', User.first.id)
        .includes(slots: :reservations)
    else
      # @restaurants = Restaurant.all.joins(:reservations)
      #   .where('time >= ? AND time >= ? AND time <= ?',
      #     c_time, s_time - 2.hours, s_time + 2.hours)
      #   .where('date = ? AND user_id = ?',
      #     params[:data][:date].to_date, User.first.id)
      #   .includes(slots: :reservations)
      @restaurants = Restaurant.distinct.joins(:reservations)
        .where('time > ?', c_time - offset.days)
        .where('time >= ?', s_time - offset.days - 1.hours)
        .where('time <= ?', s_time - offset.days + 1.hours)
        .where('date = ?', params[:data][:date].to_date)
        .where('user_id = ?', User.first.id)
        .includes(slots: :reservations)
    end

    restaurant_ids = @restaurants.pluck(:id)

    @reservations = Reservation.where(slot_id: Slot
      .where('time > ?', c_time - offset.days)
      .where('time >= ?', s_time - offset.days - 1.hours)
      .where('time <= ?', s_time - offset.days + 1.hours))
      .where('date = ?', params[:data][:date].to_date)
      .where('user_id = ?', User.first.id).includes(:slot)
      .includes(:restaurant)

      # Restaurant.distinct.joins(:reservations).where('time > ?', c_time - offset.days)


    debugger

    # reservations = Reservation.where(slot_id: Slot
    #   .where('time >= ? AND time <= ? AND restaurant_id = ?',
    #   time - 1.hours, time + 1.hours, self.id).pluck(:id))
    #   .where('date = ? AND user_id = ?',
    #   data[:date].to_date, User.first.id).includes(:slot).includes(:restaurant)


    # @reservations = Reservation.where(slot_id: Slot.where('time >= ? AND time <= ? AND restaurant_id = ?',
    #   time - 1.hours, time + 1.hours, params[:data][:restaurantId].to_i)
    #   .pluck(:id)).where('date = ? AND user_id IS NULL',
    #   params[:data][:date].to_date).includes(:slot)

    # time = Time.parse(params[:data][:time]).utc
    #
    #
    # # @restaurants = @restaurants.joins(:reservations)
    #   # .select("SELECT restaurants.name, slots.time, reservations.date")
    #   # .where('time >= ? AND time <= ? ',
    #   # time - 1.hours, time + 1.hours)
    #
    #   # .joins(:reservations)
    #   # .where('user_id IS null');
    @data = params[:data]
  end

  def search
    @restaurants = Restaurant.text_search(params[:data])
    # cuisines = ['American', 'Chinese', 'French', 'Italian', 'Japanese',
    #             'Mexican', 'Pizza']
    #
    # @matched_cuisines = []
    # cuisines.each do |cuisine|
    #   if Restaurant.where('cuisine LIKE ?', cuisine).count > 0
    #     @matched_cuisines.push(cuisine)
    #   end
    # end
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
