# Table name      :posts
#
#
# id              :integer
# title           :string
# picture         :string
# body            :text

class Post < ActiveRecord::Base
  validates :title, presence: true
  validates :body, presence: true

  mount_uploader :picture, PictureUploader
end
