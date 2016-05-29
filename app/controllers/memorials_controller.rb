class MemorialsController < ApplicationController
  before_action :set_memorial, only: [:show, :edit, :update, :protect, :access]
  before_action :require_user, except: [:home, :show, :protect, :access]
  before_action :require_creator, only: [:edit, :update]
  before_action :check_access, only: [:protect, :access]
  skip_before_filter :verify_authenticity_token, only: [:update]

  def home
    @posts = Post.last(4)

    if current_user
      redirect_to current_user.admin? ? admin_posts_path : memorials_path
    end
  end

  def index
    @memorials = current_user.memorials.order("created_at DESC")
  end

  def show
    if @memorial.protect && (session[:access_id] != @memorial.code)
      redirect_to protect_memorial_path(@memorial)
    else
      @message = Message.new
      @guestbook = Guestbook.find_by(memorial: @memorial)

      render layout: 'yes'
    end
  end

  def protect
  end

  def access
    if @memorial.code == params[:code]
      session[:access_id] = @memorial.code
      redirect_to memorial_path(@memorial)
    else
      flash[:error] = "That was not the right password."
      redirect_to protect_memorial_path(@memorial)
    end
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

  private

    def memorial_params
      params.require(:memorial).permit(:name, :dod, :biography, :hero, :address, :template_id, :protect, :code)
    end

    def set_memorial
      @memorial = Memorial.find_by_slug(params[:id])
    end

    def require_creator
      access_denied unless logged_in? and (current_user == @memorial.user || current_user.admin?)
    end

    def check_access
      if session[:access_id] == @memorial.code
        redirect_to memorial_path(@memorial)
      end
    end

end
