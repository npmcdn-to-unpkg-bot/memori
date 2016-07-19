# Table name      :posts

# id              :integer
# title           :string
# subtitle        :string
# summary         :text
# body            :text
# picture         :string
# slug            :string


class Post < ActiveRecord::Base
  include Sluggable

  validates :title, :summary, :body, :picture, presence: true
  sluggable_column :title

  mount_uploader :picture, PictureUploader

  DISQUS_SHORTNAME = Rails.env == "development" ? "dev_shortname".freeze : "production_shortname".freeze
end
