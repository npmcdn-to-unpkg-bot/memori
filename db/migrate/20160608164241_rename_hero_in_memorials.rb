class RenameHeroInMemorials < ActiveRecord::Migration
  def change
    rename_column :memorials, :hero, :picture
  end
end
