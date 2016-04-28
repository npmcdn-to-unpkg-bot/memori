Fabricator(:photo) do
  caption { Faker::Lorem.sentence(3) }
  picture { Faker::Lorem.sentence(3) }
end
