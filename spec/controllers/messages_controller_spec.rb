require 'rails_helper'

describe MessagesController do
  describe 'POST create'
end


## After mailgun sync

# context "sending emails" do
#   after { ActionMailer::Base.deliveries.clear }
#   it "sends out email to user with valid inputs" do
#     post :create, user: { email: "joe@example.com", password: "password", username: "joesmith" }
#     expect(ActionMailer::Base.deliveries.last.to).to eq(['joe@example.com'])
#   end
#   it "sends out email containing the user's name with valid inputs" do
#     post :create, user: { email: "joe@example.com", password: "password", username: "joesmith" }
#     expect(ActionMailer::Base.deliveries.last.body).to include("joesmith")
#   end
#   it "does not send out email with invalid inputs" do
#     post :create, user: { email: "joe@example.com" }
#     expect(ActionMailer::Base.deliveries).to be_empty
#   end
# end
