class PagesController < ApplicationController

  def home
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
      flash[:notice] = "Your message was sent."
      redirect_to root_path
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
