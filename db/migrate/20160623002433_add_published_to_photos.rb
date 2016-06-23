class AddPublishedToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :published, :boolean, default: true
    add_column :events, :published, :boolean, default: true
  end
end
