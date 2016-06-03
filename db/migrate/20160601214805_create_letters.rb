class CreateLetters < ActiveRecord::Migration
  def change
    create_table :letters do |t|
      t.string :name, :email, :subject
      t.text :content
      t.timestamps
    end
  end
end
