# Table name      :comments
#
#
# id              :integer
# author          :string
# body            :text

class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true

  validates :body, presence: true
  validates :author, presence: true
end
