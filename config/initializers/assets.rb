# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path
Rails.application.config.assets.paths << Rails.root.join("vendor", "assets", "images")

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
Rails.application.config.assets.precompile += %w(vendor/assets/images/*)
Rails.application.config.assets.precompile += %w( memorials/* )
Rails.application.config.assets.precompile += %w( yes/* )
Rails.application.config.assets.precompile += %w( yes.css )
Rails.application.config.assets.precompile += %w( yes.js )
Rails.application.config.assets.precompile += %w( vendor/yes/* )
