class ChangeColumnName < ActiveRecord::Migration
  def change
    rename_column :photos, :position, :row_order
  end
end
