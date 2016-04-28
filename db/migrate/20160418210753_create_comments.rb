class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :author, :commentable_type
      t.text :body
      t.integer :commentable_id

      t.timestamps
    end
  end
end
