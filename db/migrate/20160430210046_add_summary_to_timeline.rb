class AddSummaryToTimeline < ActiveRecord::Migration
  def change
    add_column :events, :summary, :string
  end
end
