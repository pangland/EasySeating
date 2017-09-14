class Review < ApplicationRecord
  validates :rating, :food, :service, :ambience, :value, presence: true
  # validates :rating, :food, :service, :ambience, :value, presence: {message: 'Please select all ratings'}
  # validate :all_subreviews_selected

  belongs_to :reservation
  has_one :restaurant, through: :reservation
  has_one :user, through: :reservation

  # def all_subreviews_selected
  #   unless :rating.present? && :food.present? && :service.present? &&
  #     :ambience.present? && :value.present?
  #     errors[:review] << 'Please enter all ratings before submitting'
  #   end
  # end
end
