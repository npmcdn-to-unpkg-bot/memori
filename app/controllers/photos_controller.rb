class PhotosController < ApplicationController

  def create
    @memorial = Memorial.find(params[:memorial_id])
    @photo =  @memorial.photos.build(params.require(:photo).permit(:caption, :picture))

    if @photo.save
      flash[:notice] = "your photo was added"
      redirect_to edit_memorial_path(@memorial)
    else
      flash[:notice] = "problem adding your photo"
      redirect_to edit_memorial_path(@memorial)
    end
  end

end
