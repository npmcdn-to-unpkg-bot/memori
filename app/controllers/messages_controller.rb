class MessagesController < ApplicationController
  def create
    @memorial = Memorial.find_by_slug(params[:memorial_id])
    @message = Message.new(params.require(:message).permit(:name, :email, :content))

    if @message.valid?
      MessageMailer.new_message(@message, @memorial.user).deliver_now
      if request.env["HTTP_REFERER"].present? and request.env["HTTP_REFERER"] != request.env["REQUEST_URI"]
        redirect_to :back, notice: "Your message has been sent"
      else
        flash[:notice] = "your message has been sent"
      end
    else
      flash[:alert] = "An error occured while delivering this message."
      render :new
    end
  end
end
