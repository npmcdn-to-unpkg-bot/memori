class Comment < ActiveRecord::Base
  belongs_to :user, foreign_key: :user_id
  belongs_to :memorial, foreign_key: :memorial_id
end
