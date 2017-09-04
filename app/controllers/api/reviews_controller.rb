class Api::ReviewsController < ApplicationController
  def index
    @reviews = Restaurant.find(params[:restaurant_id]).reviews
  end

  def show
  end

  def create
  end
end
