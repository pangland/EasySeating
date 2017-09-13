class Api::ReviewsController < ApplicationController
  def index
    @reviews = Restaurant.find(params[:restaurant_id]).reviews
  end

  def show
  end

  def create
    @review = Review.new(review_params)
    debugger

    if @review.save
      render 'api/reviews/show'
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  private

  def review_params
    params.require(:review).permit(:reservation_id, :rating, :food,
      :service, :ambience, :value, :body)
  end
end
