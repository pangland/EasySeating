class AddDateTime < ActiveRecord::Migration[5.1]
  def change
    add_column :slots, :datetime, :datetime
  end
end
