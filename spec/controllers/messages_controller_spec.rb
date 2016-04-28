require 'rails_helper'

describe MessagesController do
  describe 'POST create' do
    context "sending emails" do

      before do
        alice = Fabricate(:user)
        session[:user_id] = alice.id
        memorial1 = Fabricate(:memorial, user: alice)
      end

      after { ActionMailer::Base.deliveries.clear }

      it "sends out email to user with valid inputs" do
        post :create, memorial_id: Memorial.first.id, message: { email: "joe@example.com", name: "joesmith", content: "hello there" }
        expect(ActionMailer::Base.deliveries.last.to).to eq([Memorial.first.user.email])
      end
      it "sends out email containing the user's name with valid inputs" do
        post :create, memorial_id: Memorial.first.id, message: { email: "joe@example.com", name: "joesmith", content: "hello there" }
        expect(ActionMailer::Base.deliveries.last.body).to include("hello")
      end
      it "does not send out email with invalid inputs" do
        post :create, memorial_id: Memorial.first.id, message: { email: "joe@example.com", name: "joesmith" }
        expect(ActionMailer::Base.deliveries).to be_empty
      end
    end
  end
end
