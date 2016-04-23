class AddDodAndUrlToMemorials < ActiveRecord::Migration
  def change
    add_column :memorials, :dod, :datetime
    add_column :memorials, :url, :string
  end
end
