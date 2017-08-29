class Restaurant < ApplicationRecord
  include PgSearch
  pg_search_scope :search_name, :against => [:name, :cuisine], :using => [:tsearch, :trigram, :dmetaphone]

  validates :name, :description, :rating, :price, :hours, :cuisine, presence: true

  has_many :slots

  def self.text_search(query)
    return self.where("similarity(name, ?) > 0.1", query)
      .order("similarity(name, #{ActiveRecord::Base.connection.quote(query)}) DESC")
      .limit(10)
  end
end
