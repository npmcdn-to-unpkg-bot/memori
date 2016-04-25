class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :body
      t.integer :memorial_id, :user_id
      
      t.timestamps
    end
  end
end
