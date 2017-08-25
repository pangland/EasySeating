class Restaurant < ApplicationRecord
  include PgSearch
  pg_search_scope :search_name, :against => [:name]

  validates :name, :description, :rating, :price, :hours, :cuisine, presence: true
end
