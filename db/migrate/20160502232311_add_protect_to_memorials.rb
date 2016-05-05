class AddProtectToMemorials < ActiveRecord::Migration
  def change
    add_column :memorials, :protect, :boolean
    add_column :memorials, :code, :string
  end
end
