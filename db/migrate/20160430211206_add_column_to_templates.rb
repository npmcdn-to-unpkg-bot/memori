class AddColumnToTemplates < ActiveRecord::Migration
  def change
    add_column :templates, :theme, :string
  end
end
