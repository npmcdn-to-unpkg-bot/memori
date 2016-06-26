class Creator::PhotosController < CreatorController
  before_action :set_memorial
  before_action :set_photo, only: [:edit, :update, :destroy, :toggle]
  before_action :require_user
  before_action :require_creator
  skip_before_filter :verify_authenticity_token

  def new
    @photo = Photo.new

    respond_to do |format|
      format.html
      format.js
    end
  end

  def create
    @photo =  @memorial.photos.build(photo_params)

    respond_to do |format|
      format.html do
        puts "ran html block"
        if @photo.save
          flash[:notice] = "Your photo was added."
          redirect_to edit_creator_memorial_path(@memorial)
        else
          flash[:notice] = "There was a problem adding your photo."
          redirect_to edit_creator_memorial_path(@memorial)
        end
      end

      format.js do
        @photo.save
        @photos = @memorial.photos
      end
    end
  end

  def update
    @photo.update_attributes(photo_params)

    respond_to do |format|
      format.html do
        if @photo.update(photo_params)
          redirect_to edit_creator_memorial_path(@memorial)
        else
          render :edit
        end
      end

      format.js do
        @photos = @memorial.photos
      end

      format.json do
        respond_with_bip(@photo)
      end
    end
  end

  def toggle
    binding.pry
  end

  def destroy
    @photo.destroy if @memorial.photos.include?(@photo)

    respond_to do |format|
      format.html do
        if request.env["HTTP_REFERER"].present? and request.env["HTTP_REFERER"] != request.env["REQUEST_URI"]
          redirect_to :back
        else
          redirect_to creator_memorials_path
        end
      end

      format.js do
        @photos = @memorial.photos
      end
    end

  end

  private

    def set_memorial
      @memorial = Memorial.find_by_slug(params[:memorial_id])
    end

    def set_photo
      @photo = Photo.find(params[:id])
    end

    def photo_params
      params.require(:photo).permit(:caption, :picture, :published)
    end

    def require_creator
      access_denied unless logged_in? and (current_user == @memorial.user || current_user.admin?)
    end

end
