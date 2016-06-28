# Table name      :events
#
#
# id              :integer
# title           :string
# date            :datetime
# description     :text

class Event < ActiveRecord::Base
  belongs_to :memorial, foreign_key: :memorial_id, touch: true
  has_many :comments, as: :commentable, dependent: :destroy

  mount_uploader :picture, PictureUploader

  validates :title, :date, :description, presence: true
end
