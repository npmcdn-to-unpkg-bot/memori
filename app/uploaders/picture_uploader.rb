# encoding: utf-8

class PictureUploader < CarrierWave::Uploader::Base

  include CarrierWave::RMagick

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  version :thumb do
    process :resize_to_fit => [200, 200]
  end

  version :gallery do
    process :resize_to_fill => [557, 399]
  end

  version :home do
    process :resize_to_fill => [850, 741]
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

end
