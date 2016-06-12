# Table name      :posts
#
#
# id              :integer
# title           :string
# subtitle        :string
# summary         :text
# body            :text
# picture         :string


class Post < ActiveRecord::Base
  validates :title, presence: true
  validates :summary, presence: true
  validates :body, presence: true
  validates :picture, presence: true

  mount_uploader :picture, PictureUploader

  DISQUS_SHORTNAME = Rails.env == "development" ? "dev_shortname".freeze : "production_shortname".freeze
end
