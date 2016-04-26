Fabricator(:user) do
  username { Faker::Internet.user_name }
  password { 'password' }
  email { Faker::Internet.email }
  name { Faker::Name.name }
end
