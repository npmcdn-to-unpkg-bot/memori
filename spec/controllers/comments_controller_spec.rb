require 'rails_helper'

describe CommentsController do
  # let(:current_user) { Fabricate(:user) }
  # let(:bob) { Fabricate(:memorial, user: current_user) }
  # before { session[:user_id] = current_user.id }

  before do
    alice = Fabricate(:user)
    session[:user_id] = alice.id
    bobjohnson = Fabricate(:memorial, user: alice)
    guestb = Fabricate(:guestbook, memorial: bobjohnson)
  end

  describe "POST create" do
    context "guestbook" do
      it "creates a valid comment" do
        post :create, commentable: :guestbooks, comment: Fabricate.attributes_for(:comment), memorial_id: Memorial.first.id, guestbook_id: Memorial.first.guestbook.id
        expect(Comment.count).to eq(1)
      end
    end
    context "event" do
      it "creates a valid comment"
    end
    context "photo" do
      it "creates a valid comment"
    end
  end
end
