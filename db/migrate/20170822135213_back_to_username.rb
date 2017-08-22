class BackToUsername < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :usernameme, :string, null: false
    remove_column :users, :first_name
    remove_column :users, :last_name
  end
end
