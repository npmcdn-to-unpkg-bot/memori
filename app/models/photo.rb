# Table name      :photos
#
#
# id              :integer
# caption         :string
# picture         :string
# memorial_id     :integer
# position        :integer

class Photo < ActiveRecord::Base
  include RankedModel
  before_create :default_caption

  belongs_to :memorial, foreign_key: :memorial_id, touch: true
  has_many :comments, as: :commentable, dependent: :destroy
  mount_uploader :picture, PictureUploader

  # model ranking
  ranks :row_order, with_same: :memorial_id

  # Caption based on filename
  def default_caption
    self.caption ||= File.basename(picture.filename, '.*').titleize if picture
  end
end
