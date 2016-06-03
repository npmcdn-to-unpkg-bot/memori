# Table name      :letters
#
#
# id              :integer
# name            :string
# email           :string
# subject         :string
# content         :text

class Letter < ActiveRecord::Base
  validates :name, presence: true
  validates :email, presence: true
  validates :subject, presence: true
  validates :content, presence: true
end
