class CreateRestaurants < ActiveRecord::Migration[5.1]
  def change
    create_table :restaurants do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.string :image_url, null: false
      t.integer :cuisine, null: false
      t.integer :price, null: false
      t.integer :hours, null: false
      t.integer :rating, null: false
      t.integer :owner_id
      t.integer :city_id

      t.timestamps
    end
    add_index :restaurants, :owner_id
    add_index :restaurants, :city_id
  end
end
