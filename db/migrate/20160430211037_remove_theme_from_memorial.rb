class RemoveThemeFromMemorial < ActiveRecord::Migration
  def change
    remove_column :memorials, :theme, :string
  end
end
