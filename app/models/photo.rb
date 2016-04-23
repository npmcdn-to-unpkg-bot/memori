# Table name      :photos
#
#
# id              :integer
# caption         :string
# picture         :string
# memorial_id     :integer

class Photo < ActiveRecord::Base
  belongs_to :memorial, foreign_key: :memorial_id

  has_many :comments, as: :commentable

  mount_uploader :picture, PictureUploader

  validates :caption, presence: true
  validates :picture, presence: true
end
