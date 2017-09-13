class ReviewNullFalse < ActiveRecord::Migration[5.1]
  def change
    change_column_null :reviews, :food, false
    change_column_null :reviews, :service, false
    change_column_null :reviews, :ambience, false
    change_column_null :reviews, :value, false    
  end
end
