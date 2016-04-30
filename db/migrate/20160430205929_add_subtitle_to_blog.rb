class AddSubtitleToBlog < ActiveRecord::Migration
  def change
    add_column :posts, :subtitle, :string
    add_column :posts, :summary, :string
  end
end
