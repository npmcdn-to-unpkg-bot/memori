# Table name      :memorials
#
#
# id              :integer
# name            :string
# biography       :text
# user_id         :integer
# slug            :string
# hero            :string
# address         :string
# latitude        :float
# longitude       :float
# protect         :boolean
# code            :string

class Memorial < ActiveRecord::Base
  include Sluggable

  after_create :set_default_values

  belongs_to :user, foreign_key: :user_id
  belongs_to :template, foreign_key: :template_id

  has_many :events, -> { order "date ASC" }, foreign_key: :memorial_id
  has_many :photos, foreign_key: :memorial_id
  has_one :guestbook, foreign_key: :memorial_id

  mount_uploader :hero, HeroUploader

  validates :name, presence: true
  validates :dod, presence: true

  geocoded_by :address
  after_validation :geocode, if: :address_changed?

  sluggable_column :name

  def set_default_values
    self.biography = "This is where the biography for the deceased should go. Feel free to make it as short or long as you want. You can always come back and add more information."
  end
end
