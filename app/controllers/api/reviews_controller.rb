class Api::ReviewsController < ApplicationController
  def index
    @reviews = Restaurant.find(params[:restaurant_id]).reviews
  end

  def show
    @review = Reservation.find(params[:id]).review
  end

  def create
    @review = Review.new(review_params)

    if @review.save
      render :show
    else
      render json: ["Please enter all ratings before submitting"], status: 422
    end
  end

  def update
    @review = Review.find(params[:review][:id])

    if @review.update(review_params)
      render :show
    else
      render json: ["Please enter all ratings before submitting"], status: 422
    end
  end

  private

  def review_params
    params.require(:review).permit(:reservation_id, :rating, :food,
      :service, :ambience, :value, :body)
  end
end
