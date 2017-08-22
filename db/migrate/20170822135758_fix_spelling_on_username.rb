class FixSpellingOnUsername < ActiveRecord::Migration[5.1]
  def change
    rename_column :users, :usernameme, :username
  end
end
