# Table name      :events
#
#
# id              :integer
# title           :string
# description     :text
# date            :datetime

class Event < ActiveRecord::Base
  belongs_to :memorial, foreign_key: :memorial_id

  has_many :comments, as: :commentable

  mount_uploader :picture, PictureUploader

  validates :title, presence: true
  validates :date, presence: true
  validates :description, presence: true
end
