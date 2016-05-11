class AddSlugToMemorial < ActiveRecord::Migration
  def change
    add_column :memorials, :slug, :string
    remove_column :memorials, :url, :string
  end
end
