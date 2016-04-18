class CreateMemorials < ActiveRecord::Migration
  def change
    create_table :memorials do |t|
      t.string :name
      t.text :biography
      t.integer :user_id
      t.timestamps
    end
  end
end
