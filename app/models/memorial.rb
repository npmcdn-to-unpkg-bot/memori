# Table name      :memorials
#
#
# id              :integer
# name            :string
# biography       :text
# user_id         :integer


class Memorial < ActiveRecord::Base
  belongs_to :user, foreign_key: :user_id

  validates :name, presence: true
  validates :biography, presence: true
end
