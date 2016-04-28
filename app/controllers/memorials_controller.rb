class MemorialsController < ApplicationController
  before_action :set_memorial, only: [:show, :edit, :update]
  before_action :require_user, except: [:home, :show]
  before_action :require_creator, only: [:edit, :update]

  def home
    redirect_to memorials_path if current_user
  end

  def index
    @memorials = current_user.memorials.order("created_at DESC")
  end

  def show
    @comment = Comment.new
    @message = Message.new
    @guestbook = Guestbook.find_by(memorial: @memorial)

    render layout: 'yes'
  end

  def new
    @memorial = Memorial.new
  end

  def create
    @memorial = Memorial.new(memorial_params)
    @memorial.user = current_user
    @guestbook = Guestbook.create(memorial: @memorial)

    if @memorial.save
      flash[:notice] = "Your memorial was saved."
      redirect_to memorials_path
    else
      render :new
    end
  end

  def edit
    @events = @memorial.events
    @event = Event.new

    @photos = @memorial.photos
    @photo = Photo.new
  end

  def update
    @memorial.update_attributes(memorial_params)

    respond_to do |format|
      format.html do
        if @memorial.update(memorial_params)
          flash[:notice] = "Your memorial was updated."
          redirect_to edit_memorial_path(@memorial)
        else
          render :edit
        end
      end

      format.js
    end
  end

  def check_url
    @memorial = Memorial.find_by_url(params[:memorial][:url])

    if @memorial
      @memorial = "false"
    else
      @memorial = "true"
    end

    respond_to do |format|
      format.json { render json: @memorial }
    end
  end

  private

    def memorial_params
      params.require(:memorial).permit(:name, :dod, :url, :biography, :hero, :address, :theme)
    end

    def set_memorial
      @memorial = Memorial.find(params[:id])
    end

    def require_creator
      access_denied unless logged_in? and (current_user == @memorial.user || current_user.admin?)
    end

end
