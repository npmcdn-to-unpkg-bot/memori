class AddThemeToMemorial < ActiveRecord::Migration
  def change
    add_column :memorials, :theme, :string
  end
end
