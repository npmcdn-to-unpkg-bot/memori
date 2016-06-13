# Table name      :events
#
#
# id              :integer
# title           :string
# date            :datetime
# description     :text

class Event < ActiveRecord::Base
  belongs_to :memorial, foreign_key: :memorial_id

  has_many :comments, as: :commentable, dependent: :destroy

  mount_uploader :picture, PictureUploader

  validates :title, presence: true
  validates :date, presence: true
  validates :description, presence: true
end
