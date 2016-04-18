# Table name      :users
#
#
# id              :integer
# username        :string

class User < ActiveRecord::Base
  has_many :memorials, foreign_key: :user_id

  validates :username, presence: true, uniqueness: true
end
