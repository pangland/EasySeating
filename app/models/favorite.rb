class Favorite < ApplicationRecord
  validates :user_id, :restaurant_id, presence: true
end
