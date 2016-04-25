# Table name      :memorials
#
#
# id              :integer
# name            :string
# biography       :text
# user_id         :integer
# hero            :string
# address         :string
# latitude        :float
# longitude       :float

class Memorial < ActiveRecord::Base
  belongs_to :user, foreign_key: :user_id

  has_many :events, -> { order "date ASC" }, foreign_key: :memorial_id
  has_many :photos, foreign_key: :memorial_id
  has_many :comments, as: :commentable

  mount_uploader :hero, HeroUploader

  validates :name, presence: true
  validates :dod, presence: true

  geocoded_by :address
  after_validation :geocode, if: :address_changed?
end
