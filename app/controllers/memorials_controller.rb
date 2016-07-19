class MemorialsController < ApplicationController
  before_action :set_memorial, only: [:show, :protect, :access, :contact, :load_comments, :load_events]
  before_action :check_access, only: [:protect, :access]

  def show
    # Check if memorial is private
    if @memorial.protect && (session[:access_id] != @memorial.code)
      redirect_to protect_memorial_path(@memorial)
    else
      @message = Message.new
      @guestbook = Guestbook.find_by(memorial: @memorial)

      @comments = @guestbook.comments.paginate(page: params[:guestbook_page], per_page: 5)
      @events = @memorial.events.paginate(page: params[:event_page], per_page: 2)
      @photos = @memorial.photos.where(published: true).rank(:row_order)

      ahoy.track "#{@memorial.name}"

      render layout: 'yes'
    end
  end

  def load_events
    @events = @memorial.events.paginate(page: params[:event_page], per_page: 2)

    respond_to do |format|
      format.html
      format.js
    end
  end

  def load_comments
    @guestbook = Guestbook.find_by(memorial: @memorial)
    @comments = @guestbook.comments.paginate(page: params[:guestbook_page], per_page: 5)

    respond_to do |format|
      format.html
      format.js
    end
  end

  def protect
    render layout: 'yes'
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

  def contact
    @message = Message.new(params.require(:message).permit(:name, :email, :content))

    if @message.valid?
      NotificationMailer.contact_memorial_creator(@message, @memorial.user).deliver_now
      redirect_to :back, notice: "Your message has been sent"
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

      if @memorial == nil
        redirect_to root_path
      end
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
