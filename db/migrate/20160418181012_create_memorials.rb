class CreateMemorials < ActiveRecord::Migration
  def change
    create_table :memorials do |t|
      t.string :name, :url, :hero, :address
      t.text :biography
      t.integer :user_id
      t.datetime :dod, :dob
      t.float :latitude, :longitude

      t.timestamps
    end
  end
end
