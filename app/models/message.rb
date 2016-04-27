# Table name      :messages
#
#
# id              :integer
# name            :string
# email           :string
# content         :text

class Message < ActiveRecord::Base
  validates :name, presence: true
  validates :email, presence: true
  validates :content, presence: true
end
