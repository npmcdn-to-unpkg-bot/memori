class LetterMailer < ActionMailer::Base
  def contact_admin(message)
    @message = message

    mail to: 'me@tyshaikh.com', from: message.email, subject: message.subject
  end
end
