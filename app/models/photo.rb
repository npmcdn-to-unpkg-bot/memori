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

  before_create :default_caption

  def default_caption
    self.caption ||= File.basename(picture.filename, '.*').titleize if picture
  end

  # validates :caption, presence: true
  # validates :picture, presence: true
end
