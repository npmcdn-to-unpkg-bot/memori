class DropLetters < ActiveRecord::Migration
  def change
    drop_table :letters
  end
end
