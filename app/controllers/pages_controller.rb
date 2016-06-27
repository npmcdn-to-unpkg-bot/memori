# Controller for static pages
class PagesController < ApplicationController

  def home
    @posts = Post.order('created_at DESC').limit(4)
    @memorials = Memorial.order('created_at DESC').limit(4).where(protect: false)
    @photos = Photo.joins(:memorial).where(memorials: {protect:false}).limit(6)
  end

  def show
    if valid_page?
      render template: "pages/#{params[:page]}"
    else
      render file: "public/404.html", status: :not_found
    end
  end

  def contact
    @message = Message.new(params.require(:message).permit(:name, :email, :content))

    if @message.valid?
      NotificationMailer.contact_admin(@message).deliver_now
      if request.env["HTTP_REFERER"].present? and request.env["HTTP_REFERER"] != request.env["REQUEST_URI"]
        redirect_to root_path
      else
        flash[:notice] = "Your message has been sent."
      end
    else
      flash[:alert] = "An error occured while delivering this message."
      redirect_to :back
    end
  end

  private

    def valid_page?
      File.exist?(Pathname.new(Rails.root + "app/views/pages/#{params[:page]}.html.erb"))
    end
end
