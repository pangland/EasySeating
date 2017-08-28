class CreateReservations < ActiveRecord::Migration[5.1]
  def change
    create_table :reservations do |t|
      t.integer :user_id
      t.date :date, null: false
      t.integer :slot_id, null: false
      t.timestamps
    end
    add_index :reservations, :user_id
    add_index :reservations, :slot_id
  end
end
