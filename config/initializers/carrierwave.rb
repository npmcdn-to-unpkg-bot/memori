# config/initializers/carrierwave.rb

CarrierWave.configure do |config|
  if Rails.env.staging? || Rails.env.production?
    config.storage = :fog
    config.fog_directory    = ENV['S3_BUCKET_NAME']
    config.fog_credentials = {
      :provider              => 'AWS',
      :aws_access_key_id     => ENV['S3_KEY'],
      :aws_secret_access_key => ENV['S3_SECRET'],
      :region                => ENV['S3_REGION']
    }
  else
    config.storage = :file
    config.enable_processing = Rails.env.development?
    config.root = "#{Rails.root}/tmp"
  end
end
