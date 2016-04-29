class AddTemplateIdToMemorial < ActiveRecord::Migration
  def change
    add_column :memorials, :template_id, :integer
  end
end
