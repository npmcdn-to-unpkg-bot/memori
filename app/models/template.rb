# Table name      :templates
#
#
# id              :integer
# name            :string
# theme           :string
# variant         :string


class Template < ActiveRecord::Base
  has_many :memorials

  validates :name, :theme, :variant, presence: true
end
