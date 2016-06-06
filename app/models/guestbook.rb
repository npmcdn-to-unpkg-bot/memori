# Table name      :memorials
#
#
# id              :integer
# memorial_id     :integer

class Guestbook < ActiveRecord::Base
  # create a single guestbook for each memorial to store the comments
  belongs_to :memorial, foreign_key: :memorial_id
  has_many :comments, as: :commentable
end
