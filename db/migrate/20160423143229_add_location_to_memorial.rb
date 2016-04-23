class AddLocationToMemorial < ActiveRecord::Migration
  def change
    add_column :memorials, :address, :string
    add_column :memorials, :latitude, :float
    add_column :memorials, :longitude, :float
  end
end
