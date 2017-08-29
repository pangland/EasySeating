class AlterSlotColumns < ActiveRecord::Migration[5.1]
  def change
    remove_column :slots, :time
    remove_column :slots, :datetime
    add_column :slots, :time, :datetime, null: false
  end
end
