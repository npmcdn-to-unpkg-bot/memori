class Creator::MemorialsController < CreatorController
  before_action :set_memorial, only: [:show, :edit, :edit_photos, :edit_events, :update, :toggle_photo]
  before_action :require_user
  before_action :require_creator, only: [:edit, :update]
  skip_before_filter :verify_authenticity_token, only: [:update]

  def index
    @memorials = current_user.memorials.order("created_at DESC")
    @post = Post.order("RANDOM()").first
  end

  def new
    @memorial = Memorial.new
  end

  def about
  end

  def toggle_photo
    @photo = Photo.find(params[:photo_id])
    @photo.published = !@photo.published
    @photo.save

    respond_to do |format|
      format.js do
      end
    end
  end

  def toggle_event
    @event = Event.find(params[:event_id])
    @event.published = !@event.published
    @event.save

    respond_to do |format|
      format.js do
      end
    end
  end

  def create
    @memorial = Memorial.new(memorial_params)
    @memorial.user = current_user

    Guestbook.create(memorial: @memorial)

    if @memorial.save
      flash[:notice] = "Your memorial was saved."
      redirect_to creator_memorials_path
    else
      render :new
    end
  end

  def edit
    @recent_visits = Ahoy::Event.where(name: @memorial.name).count
    @post = Post.order("RANDOM()").first
  end

  def edit_photos
    @recent_visits = Ahoy::Event.where(name: @memorial.name).count
    @post = Post.order("RANDOM()").first

    @photos = @memorial.photos
    @photo = Photo.new
  end

  def edit_events
    @recent_visits = Ahoy::Event.where(name: @memorial.name).count
    @post = Post.order("RANDOM()").first

    @events = @memorial.events
    @event = Event.new
  end

  def update
    @memorial.update_attributes(memorial_params)

    respond_to do |format|
      format.html do
        if @memorial.update(memorial_params)
          flash[:notice] = "Your memorial was updated."
          redirect_to edit_creator_memorial_path(@memorial)
        else
          render :edit
        end
      end

      format.js
    end
  end

  private

    def memorial_params
      params.require(:memorial).permit(:name, :dod, :biography, :picture, :address, :template_id, :protect, :code)
    end

    def set_memorial
      @memorial = Memorial.find_by_slug(params[:id])
    end

    def require_creator
      access_denied unless logged_in? and (current_user == @memorial.user || current_user.admin?)
    end

end
