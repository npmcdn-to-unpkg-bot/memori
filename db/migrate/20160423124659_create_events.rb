class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title, :picture
      t.text :description
      t.datetime :date
      t.integer :memorial_id

      t.timestamps
    end
  end
end
