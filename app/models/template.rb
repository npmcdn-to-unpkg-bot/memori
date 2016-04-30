# Table name      :templates
#
#
# id              :integer
# name            :string
# variant         :string

class Template < ActiveRecord::Base
  has_many :memorials

  validates :name, presence: true
  validates :theme, presence: true
  validates :variant, presence: true
end
