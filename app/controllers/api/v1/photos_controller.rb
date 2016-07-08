class Api::V1::PhotosController < Api::V1::BaseController
  def home_photos
    respond_with Photo.all.limit(6)
  end
end
