class Api::FavoritesController < ApplicationController
  def create
    @favorite = Favorite.new(favorite_params)

    if @favorite.save
      render "api/favorites/show"
    else
      render @favorite.errors.full_messages, status: 422
    end
  end

  def index
  end

  private

  def favorite_params
    params.require(:favorite).permit(:user_id, :restaurant_id)
  end
end
