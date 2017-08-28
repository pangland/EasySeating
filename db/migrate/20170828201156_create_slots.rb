class CreateSlots < ActiveRecord::Migration[5.1]
  def change
    create_table :slots do |t|
      t.integer :restaurant_id, null: false
      t.integer :seats, null: false
      t.time :time, null: false
      t.timestamps
    end
  end
end
