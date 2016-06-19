class AddRowOrderToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :position, :integer
    add_index :photos, :position
  end
end
