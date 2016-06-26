class PhotosController < ApplicationController
  before_action :set_memorial
  skip_before_filter :verify_authenticity_token

  def create
    @photo = @memorial.photos.build(photo_params)
    @photo.published = false

    NotificationMailer.new_photo(@memorial.user).deliver_now

    if @photo.save
      flash[:notice] = "Your photo was submitted."
      redirect_to :back
    else
      flash[:notice] = "Problem adding your event."
      redirect_to :back
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
