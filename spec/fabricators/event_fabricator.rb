Fabricator(:event) do
  title { Faker::Lorem.word }
  date { Faker::Date.between_except(1.year.ago, 1.year.from_now, Date.today) }
  description { Faker::Lorem.paragraph  }
end
