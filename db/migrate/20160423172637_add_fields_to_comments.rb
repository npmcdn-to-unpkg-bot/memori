class AddFieldsToComments < ActiveRecord::Migration
  def change
    add_column :comments, :commentable_type, :string
    add_column :comments, :commentable_id, :integer
    add_column :comments, :author, :string
    remove_column :comments, :user_id, :integer
  end
end
