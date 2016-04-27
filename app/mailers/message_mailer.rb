class MessageMailer < ActionMailer::Base
  def new_message(message, user)
    @message = message
    @user = user

    mail to: user.email, from: message.email, subject: "New Message from #{message.name}"
  end
end
