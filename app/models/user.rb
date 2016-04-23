# Table name      :users
#
#
# id              :integer
# username        :string

class User < ActiveRecord::Base
  has_many :memorials, foreign_key: :user_id
  has_many :comments, foreign_key: :user_id

  has_secure_password validations: false

  validates :username, presence: true, uniqueness: true
  validates :password, presence: true, on: :create, length: { minimum: 6 }
  validates :name, presence: true
  validates :email, presence: true

  def admin?
    self.role == 'admin'
  end
end
