class AddMemorialToEvents < ActiveRecord::Migration
  def change
    add_column :events, :memorial_id, :integer
  end
end
