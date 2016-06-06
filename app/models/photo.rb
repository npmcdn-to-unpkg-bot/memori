# Table name      :photos
#
#
# id              :integer
# caption         :string
# picture         :string
# memorial_id     :integer

class Photo < ActiveRecord::Base
  before_create :default_caption

  belongs_to :memorial, foreign_key: :memorial_id
  has_many :comments, as: :commentable
  mount_uploader :picture, PictureUploader

  # Caption based on filename
  def default_caption
    self.caption ||= File.basename(picture.filename, '.*').titleize if picture
  end
end
