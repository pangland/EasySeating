class ChangeFieldsToString < ActiveRecord::Migration[5.1]
  def change
    change_column :restaurants, :cuisine, :string
    change_column :restaurants, :price, :string
    change_column :restaurants, :hours, :string
  end
end
