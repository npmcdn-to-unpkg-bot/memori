class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, :password_digest, :name, :email, :role
      
      t.timestamps
    end
  end
end
