source 'https://rubygems.org'

gem 'rails', '4.2.6'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'jquery-rails'
gem 'jquery-ui-rails'
gem 'jbuilder', '~> 2.0'

gem 'responders'


gem 'sdoc', '~> 0.4.0', group: :doc

# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

# Gems for image uploading
gem "figaro", ">= 1.0.0"
gem 'carrierwave'
gem 'rmagick'
gem 'fog'

# convert street address to lat / long
gem 'geocoder'
# WYSIWYG editor
gem 'ckeditor'
# better rails web server
gem 'puma'
# gem 'unicorn'
# postgres db
gem 'pg'
# mailgun rails gem
gem 'mailgun_rails'
gem 'responders'
# jquery file upload gem
gem 'jquery-fileupload-rails'
# in-place text editing
gem 'best_in_place'
# pagination for posts and items
gem 'will_paginate', '~> 3.1.0'
# visitor stats
gem 'ahoy_matey'

# gem for model positioning
gem 'ranked-model'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'

  # various test gems
  gem 'rspec-rails'
  gem 'fabrication'
  gem 'faker'
  gem 'pry'
  gem 'shoulda-matchers'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'

  # opens emails in the dev environemtn
  gem 'letter_opener'
end

group :production do
  gem 'rails_12factor'
  gem 'dalli'
  gem 'rack-cache'
  gem 'kgio'
  gem "memcachier"
end


# ruby-2.1.2
