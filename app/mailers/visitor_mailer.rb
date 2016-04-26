class VisitorMailer < ActionMailer::Base
  def send_email(user)
    mail to: user.email, from: "info@memorialspaces.com", subject: "New Message from Memorial Spaces"
  end

end
