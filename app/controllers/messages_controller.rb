class MessagesController < ApplicationController
  def create
    @memorial = Memorial.find(params[:memorial_id])
    @message = Message.new(params.require(:message).permit(:name, :email, :content))

    if @message.valid?
      MessageMailer.new_message(@message, @memorial.user).deliver
      redirect_to :back, notice: "Your message has been sent"
    else
      flash[:alert] = "An error occured while delivering this message."
      render :new
    end
  end

end
