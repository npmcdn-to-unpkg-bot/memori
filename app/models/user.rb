# Table name      :users
#
#
# id              :integer
# username        :string
# password_digest :string
# name            :string
# email           :string
# role            :string

class User < ActiveRecord::Base
  has_many :memorials, foreign_key: :user_id

  has_secure_password validations: false

  validates :username, presence: true, uniqueness: true
  validates :password, presence: true, on: :create, length: { minimum: 6 }
  validates :name, :email, presence: true

  # simple roles for admin user
  def admin?
    self.role == 'admin'
  end
end
