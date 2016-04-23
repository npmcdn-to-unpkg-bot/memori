class AddHeroToMemorials < ActiveRecord::Migration
  def change
    add_column :memorials, :hero, :string
  end
end
