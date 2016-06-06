# Table name      :templates
#
#
# id              :integer
# name            :string
# theme           :string
# variant         :string


class Template < ActiveRecord::Base
  has_many :memorials

  validates :name, presence: true
  validates :theme, presence: true

  # color variation of theme
  validates :variant, presence: true
end
