class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.integer :reservation_id, null: false
      t.integer :rating, null: false
      t.integer :food
      t.integer :service
      t.integer :ambience
      t.integer :value
      t.text :body
      t.timestamps
    end
  end
end
