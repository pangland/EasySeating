class Restaurant < ApplicationRecord
  include PgSearch
  pg_search_scope :search_name, :against => [:name, :cuisine], :using => [:tsearch, :trigram, :dmetaphone]

  validates :name, :description, :rating, :price, :hours, :cuisine, presence: true
end
