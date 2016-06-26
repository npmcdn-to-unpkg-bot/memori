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

  def new_event(user)
    mail to: user.email, from: 'admin@gomemori.com', subject: "New Timeline Event Suggestion"
  end

  def new_photo(user)
    mail to: user.email, from: 'admin@gomemori.com', subject: "New Photo Submission"
  end
end
