class NotificationMailer < ActionMailer::Base
  def contact_memorial_creator(message, user)
    @message = message
    @user = user

    mail to: user.email, from: message.email, subject: "New Message from #{message.name}"
  end

  def contact_admin(message)
    @message = message

    mail to: 'me@tyshaikh.com', from: message.email, subject: "New Message from GoMemori"
  end
end
