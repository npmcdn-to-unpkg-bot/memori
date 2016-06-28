# Table name      :comments
#
#
# id              :integer
# author          :string
# body            :text

class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true, touch: true
  validates :body, :author, presence: true
end
