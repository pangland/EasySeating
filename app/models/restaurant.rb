class Restaurant < ApplicationRecord
  validates :name, :description, :rating, :price, :hours, :cuisine, presence: true
end
