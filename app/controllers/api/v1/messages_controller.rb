class Api::V1::MessagesController < Api::V1::BaseController
  def contact_admin
    @message = Message.new(message_params)

    if @message.valid?
      NotificationMailer.contact_admin(@message).deliver_now
      flash[:alert] = "You message was sent."
    else
      flash[:alert] = "An error occured while delivering this message."
    end

    render json: @message, layout: false
  end

  private

    def message_params
      params.require(:message).permit(:name, :email, :content)
    end

end
