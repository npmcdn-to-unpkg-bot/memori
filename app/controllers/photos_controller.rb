class PhotosController < ApplicationController
  before_action :set_memorial
  before_action :set_photo, only: [:edit, :update, :destroy]
  before_action :require_user
  before_action :require_creator
  skip_before_filter :verify_authenticity_token


  def new
    @photo = Photo.new

    respond_to do |format|
      format.js
    end
  end

  def create
    @photo =  @memorial.photos.build(params.require(:photo).permit(:caption, :picture))

    respond_to do |format|
      format.html do
        if @photo.save
          flash[:notice] = "your photo was added"
          redirect_to edit_memorial_path(@memorial)
        else
          flash[:notice] = "problem adding your photo"
          redirect_to edit_memorial_path(@memorial)
        end
      end

      format.js do
        @photos = @memorial.photos
      end
    end
  end

  def destroy
    @photo.destroy if @memorial.photos.include?(@photo)

    respond_to do |format|
      format.html do
        redirect_to :back
      end

      format.js do
        @photos = @memorial.photos
      end
    end

  end

  private

    def set_memorial
      @memorial = Memorial.find(params[:memorial_id])
    end

    def set_photo
      @photo = Photo.find(params[:id])
    end

    def photo_params
      params.require(:photo).permit(:caption, :picture)
    end

    def require_creator
      access_denied unless logged_in? and (current_user == @memorial.user || current_user.admin?)
    end

end
