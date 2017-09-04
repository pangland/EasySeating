class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find(params[:id])

    time = Time.now.utc
    @past_reservations = @user.reservations
      .where('time <= ?', time).includes(:slot)

    @upcoming_reservations = @user.reservations
      .where('time > ?', time).includes(:slot)


    # time = Time.parse(data[:time]).utc
    #
    # reservations = Reservation.where(slot_id: Slot
    #   .where('time >= ? AND time <= ? AND restaurant_id = ?',
    #   time - 1.hours, time + 1.hours, self.id).pluck(:id))
    #   .where('date = ? AND user_id IS NULL',
    #   data[:date].to_date).includes(:slot)
    #
    # reservations
  end
end
