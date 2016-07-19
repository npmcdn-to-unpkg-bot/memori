class Api::V1::PhotosController < Api::V1::BaseController
  before_action :set_memorial
  skip_before_filter :verify_authenticity_token

  def home_photos
    @photos = Photo.joins(:memorial).where(memorials: {protect:false}).limit(6)
    render json: @photos, layout: false
  end

  def create
    @photo = @memorial.photos.build(photo_params)
    @photo.published = false
    NotificationMailer.new_photo(@memorial.user).deliver_now

    if @photo.save
      render json: @memorial.photos.where(published: true), layout: false
    end
  end

  private

    def photo_params
      params.require(:photo).permit(:caption, :picture, :published)
    end

    def set_memorial
      @memorial = Memorial.find_by_slug(params[:memorial_id])
    end
    
end
