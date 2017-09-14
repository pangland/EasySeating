class Favorite < ApplicationRecord
  validates :user_id, :restaurant_id, presence: true

  belongs_to :user
  belongs_to :restaurant

  def get_rating
    self.restaurant.reviews.reduce(0) do |acc, el|
      acc + el.rating
    end
  end
end
