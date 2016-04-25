class PhotosController < ApplicationController
  before_action :set_memorial
  before_action :require_user
  before_action :require_creator

  def create
    @photo =  @memorial.photos.build(params.require(:photo).permit(:caption, :picture))

    if @photo.save
      flash[:notice] = "your photo was added"
      redirect_to edit_memorial_path(@memorial)
    else
      flash[:notice] = "problem adding your photo"
      redirect_to edit_memorial_path(@memorial)
    end
  end

  def destroy
    photo = Photo.find(params[:id])
    photo.destroy if @memorial.photos.include?(photo)
    redirect_to :back
  end

  private

    def set_memorial
      @memorial = Memorial.find(params[:memorial_id])
    end

    def require_creator
      access_denied unless logged_in? and (current_user == @memorial.user || current_user.admin?)
    end

end
