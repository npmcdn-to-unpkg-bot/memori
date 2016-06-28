# Table name      :messages
#
#
# id              :integer
# name            :string
# email           :string
# content         :text

class Message < ActiveRecord::Base
  validates :name, :email, :content, presence: true
end
