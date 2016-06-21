class MemorialsController < AuthenticatedController
  before_action :set_memorial, only: [:show, :edit, :update, :protect, :access, :contact]
  before_action :require_user, except: [:show, :protect, :access, :contact]
  before_action :require_creator, only: [:edit, :update]
  before_action :check_access, only: [:protect, :access]
  skip_before_filter :verify_authenticity_token, only: [:update]

  def index
    @memorials = current_user.memorials.order("created_at DESC")
    @post = Post.order("RANDOM()").first
  end

  def show
    # Check if memorial is private
    if @memorial.protect && (session[:access_id] != @memorial.code)
      redirect_to protect_memorial_path(@memorial)
    else
      @message = Message.new
      @guestbook = Guestbook.find_by(memorial: @memorial)

      ahoy.track "#{@memorial.name}"
      p current_visit

      render layout: 'yes'
    end
  end


  def protect; end

  # route for accessing private memorial
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
    @recent_visits = Ahoy::Event.where(name: @memorial.name).count
    @post = Post.order("RANDOM()").first


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

  def contact
    @message = Message.new(params.require(:message).permit(:name, :email, :content))

    if @message.valid?
      NotificationMailer.contact_memorial_creator(@message, @memorial.user).deliver_now
      if request.env["HTTP_REFERER"].present? and request.env["HTTP_REFERER"] != request.env["REQUEST_URI"]
        redirect_to :back, notice: "Your message has been sent"
      else
        flash[:notice] = "Your message has been sent."
      end
    else
      flash[:alert] = "An error occured while delivering this message."
      render :new
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

    def check_access
      if session[:access_id] == @memorial.code
        redirect_to memorial_path(@memorial)
      end
    end

end
