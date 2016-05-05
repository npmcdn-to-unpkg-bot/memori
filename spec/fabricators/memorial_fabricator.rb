Fabricator(:memorial) do
  name { Faker::Name.name }
  dod { Faker::Date.between_except(1.year.ago, 1.year.from_now, Date.today) }
end
